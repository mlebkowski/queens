/** @global window */
import classNames from "classnames";
import React, { useMemo } from "react";

const nonEmpty = (mod: string | unknown): mod is string =>
  String(mod).length > 0;
const trimStrings = (element: string | unknown): string | unknown =>
  typeof element === "string" ? element.trim() : element;

type Modifier = string | string[] | object | null;
type TemplateArgs = [TemplateStringsArray, ...object[]];

type TemplateArgsZipped = (string | object)[];
type TemplateFn = (...args: TemplateArgs) => string;
type TemplateFnZipped = (args: TemplateArgsZipped) => string;
type Mixable = string & {
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
  constructor(
    private readonly name: string,
    private autoMix: string | undefined = undefined,
  ) {}

  block(modifiers: Modifier = null): string {
    return classNames(
      this.name,
      this.autoMix,
      getModifiers(this.name, modifiers),
    );
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

  return (
    modifiers: TemplateStringsArray | undefined = undefined,
    ...dynamic: object[]
  ) => fn([...zip([...(modifiers || [])], [...dynamic])]);
}

function toSnakeCase(str: string): string {
  return str.replace(/([a-z])(?=[A-Z])/g, "$1-").toLowerCase();
}

function allowMixing(args: TemplateArgs, fn: TemplateFn) {
  const base = fn(...args);
  return {
    toString: () => base,
    mix: taggedLiteral((mixes) =>
      [base, classNames(...mixes.map(trimStrings).filter(nonEmpty))].join(" "),
    ),
  } as Mixable & string; // react className expects string explicitly
}

class BemHelper {
  private readonly bemFactory: BemFactory;
  public readonly root: string;

  constructor(
    private readonly name: string,
    private readonly autoMix: string | undefined,
  ) {
    this.bemFactory = new BemFactory(toSnakeCase(name), autoMix);
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

type BemProps<P> = { bem: BemHelper & string } & P;
type OptionalClassName = {
  className?: string;
};

export function withBem<P>(
  Component: React.ComponentType<BemProps<P>> & Function,
): React.ComponentType<P & OptionalClassName> {
  const name = Component.displayName || Component.name;
  if (!name) {
    console.warn(
      `withBem called on an anonymous component. Add .displayName to your component`,
      Component,
    );
  }

  const WrappedComponent = (args: P) => {
    const parentMix = (args as OptionalClassName)?.className;
    const bem = useMemo(
      () => new BemHelper(name, parentMix),
      [parentMix],
    ) as BemHelper & string;
    return <Component {...args} bem={bem} />;
  };
  WrappedComponent.displayName = `Bem(${name})`;
  return WrappedComponent;
}

export namespace withBem {
  export type props<T = {}> = BemProps<T>;
}
