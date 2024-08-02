/** @global window */
import classNames from "classnames";
import React, { useMemo } from "react";

const nonEmpty = (mod: string | unknown): mod is string =>
  String(mod).length > 0;
const trimStrings = (element: string | unknown): string | unknown =>
  typeof element === "string" ? element.trim() : element;

type Modifier = string | string[] | object | null;
type TemplateArgs = [string[], ...object[]];
type TemplateArgsZipped = (string | object)[];
type TemplateFn = (...args: TemplateArgs) => string;
type TemplateFnZipped = (args: TemplateArgsZipped) => string;
type Mixable = {
  toString: () => string;
  mix: TemplateFn;
};

const getModifiers = (prefix: string, modifier: Modifier) => {
  if (!modifier) {
    return [];
  }

  return classNames(modifier)
    .split(" ")
    .filter(nonEmpty)
    .map((name) => `${prefix}--${name}`);
};

class BemFactory {
  constructor(private readonly name: string) {}

  block(modifiers: Modifier = null): string {
    return [this.name].concat(getModifiers(this.name, modifiers)).join(" ");
  }

  element(block: string, modifiers: Modifier = null): string {
    const blockName = `${this.name}__${block}`;
    return [blockName].concat(getModifiers(blockName, modifiers)).join(" ");
  }

  toString() {
    return this.block();
  }
}

function taggedLiteral(fn: TemplateFnZipped): TemplateFn {
  function* zip(strings: string[], params: object[]) {
    yield strings.shift() as string;
    while (strings.length) {
      yield params.shift() as object;
      yield strings.shift() as string;
    }
  }

  return (modifiers: string[] = [], ...dynamic: object[]) =>
    fn([...zip([...modifiers], [...dynamic])]);
}

function toSnakeCase(str: string): string {
  return str.replace(/([a-z])(?=[A-Z])/g, "$1-").toLowerCase();
}

// takes `fn() -> string` and returns `{ toString, mix }`
function allowMixing(args: TemplateArgs, fn: TemplateFn): Mixable {
  const base = fn(...args);
  return {
    toString: () => base,
    mix: taggedLiteral((mixes) =>
      [base, classNames(...mixes.map(trimStrings).filter(nonEmpty))].join(" "),
    ),
  };
}

class BemHelper {
  private readonly bemFactory: BemFactory;
  public readonly root: string;

  constructor(private readonly name: string) {
    this.bemFactory = new BemFactory(toSnakeCase(name));
    this.root = this.toString();
    this.block = this.block.bind(this);
    this.block.toString = () => this.toString();
    this.element = this.element.bind(this);
    this.mix = this.mix.bind(this);
  }

  toString() {
    return this.bemFactory.toString();
  }

  block(...args: TemplateArgs) {
    return allowMixing(
      args,
      taggedLiteral((modifiers) => this.bemFactory.block(modifiers)),
    );
  }

  element(...args: TemplateArgs) {
    return allowMixing(args, (strings, ...modifiers) => {
      return [
        this.bemFactory.element(strings[0].trim(), modifiers),
        ...(strings || []).slice(1).map(trimStrings),
      ].join(" ");
    });
  }

  mix(otherClasses: string[]) {
    return [this.bemFactory.toString(), otherClasses].join(" ");
  }
}

type BemProps<P> = { bem: BemHelper } & P;

export function withBem<P>(
  Component: React.ComponentType<P> & Function,
): React.ComponentType<BemProps<P>> {
  const name = Component.displayName || Component.name;
  if (!name && process.env.NODE_ENV === "development") {
    console.warn(
      `withBem called on an anonymous component. Add .displayName to your component`,
      Component,
    );
  }

  const WrappedComponent = (args: P) => {
    return <Component {...args} bem={useMemo(() => new BemHelper(name), [])} />;
  };
  WrappedComponent.displayName = `Bem(${name})`;
  return WrappedComponent;
}

export namespace withBem {
  export type props<T> = BemProps<T>;
}
