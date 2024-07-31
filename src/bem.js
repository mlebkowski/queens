import classNames from "classnames";
import React, { useMemo } from "react";

const nonEmpty = (mod) => String(mod).length > 0;
const trimStrings = (element) =>
  typeof element === "string" ? element.trim() : element;

const getModifiers = (prefix, modifier) => {
  if (!modifier) {
    return [];
  }

  return classNames(modifier)
    .split(" ")
    .filter(nonEmpty)
    .map((name) => `${prefix}--${name}`);
};

class BemFactory {
  name;

  constructor(name) {
    this.name = name;
  }

  block(modifiers = null) {
    return [this.name].concat(getModifiers(this.name, modifiers)).join(" ");
  }

  element(block, modifiers = null) {
    const blockName = `${this.name}__${block}`;
    return [blockName].concat(getModifiers(blockName, modifiers)).join(" ");
  }

  toString() {
    return this.block();
  }
}

function taggedLiteral(fn) {
  function* zip(strings, params) {
    yield strings.shift();
    while (strings.length) {
      yield params.shift();
      yield strings.shift();
    }
  }

  return (modifiers = [], ...dynamic) =>
    fn([...zip([...modifiers], [...dynamic])]);
}

function toSnakeCase(str) {
  return str.replace(/([a-z])(?=[A-Z])/g, "$1-").toLowerCase();
}

// takes `fn() -> string` and returns `{ toString, mix }`
function allowMixing(args, fn) {
  const base = fn(...args);
  return {
    toString: () => base,
    mix: taggedLiteral((mixes) =>
      [base, classNames(...mixes.map(trimStrings).filter(nonEmpty))].join(" "),
    ),
  };
}

class BemHelper {
  #block;
  root;
  constructor(name) {
    this.#block = new BemFactory(toSnakeCase(name));
    this.root = this.toString();
    this.block = this.block.bind(this);
    this.block.toString = () => this.toString();
    this.element = this.element.bind(this);
    this.mix = this.mix.bind(this);
  }

  toString() {
    return this.#block.toString();
  }

  block() {
    return allowMixing(
      arguments,
      taggedLiteral((modifiers) => this.#block.block(modifiers)),
    );
  }

  element() {
    return allowMixing(arguments, (strings, ...modifiers) => {
      return [
        this.#block.element(strings[0].trim(), modifiers),
        ...(strings || []).slice(1).map(trimStrings),
      ].join(" ");
    });
  }

  mix(otherClasses) {
    return [this.#block.toString(), otherClasses].join(" ");
  }
}

export function bem(name) {
  return new BemFactory(name);
}

export function withBem(Component) {
  const name = Component.displayName || Component.name;
  if (!name && __DEV__) {
    console.warn(
      `withBem called on an anonymous component. Add .displayName to your component`,
      Component,
    );
  }

  const WrappedComponent = (args) => {
    return <Component {...args} bem={useMemo(() => new BemHelper(name), [])} />;
  };
  WrappedComponent.displayName = `Bem(${name})`;
  return WrappedComponent;
}
