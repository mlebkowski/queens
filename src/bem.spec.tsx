import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { withBem } from "./bem";
import { describe, expect, test } from "@jest/globals";

describe("bem", () => {
  const sut = (fn, className = undefined) => {
    const Component = ({ bem }) => <p className={fn(bem)}></p>;
    Component.displayName = "Alpha";
    const Decorated = withBem(Component);
    const { props } = ReactTestRenderer.create(
      <Decorated className={className} />,
    ).toJSON();
    return String(props.className);
  };

  test("simplest case for block name", () => {
    expect(sut((bem) => bem)).toBe("alpha");
  });

  test("using root", () => {
    expect(sut(({ root }) => root)).toBe("alpha");
  });

  test("simplest test case for element", () => {
    expect(sut(({ element }) => element`bravo`)).toBe("alpha__bravo");
  });

  test("block with modifiers", () => {
    expect(sut(({ block }) => block`bravo`)).toBe("alpha alpha--bravo");
  });

  test("block with dynamic modifiers", () => {
    expect(sut(({ block }) => block`${{ bravo: true }}`)).toBe(
      "alpha alpha--bravo",
    );
  });

  test("mixing block with className passed from parent", () => {
    expect(sut(({ block }) => block``, "mixed-in")).toBe("alpha mixed-in");
  });

  test("block with modifiers and a parent mix", () => {
    expect(sut(({ block }) => block`bravo`, "mixed-in")).toBe(
      "alpha mixed-in alpha--bravo",
    );
  });

  test("element does not get mixed with parent className", () => {
    expect(sut(({ element }) => element`foo`, "mixed-in")).toBe("alpha__foo");
  });

  test("advanced modifiers", () => {
    expect(
      sut(
        ({ block }) =>
          block`bravo ${{ charlie: true, delta: false }} echo foxtrot`,
      ),
    ).toBe("alpha alpha--bravo alpha--charlie alpha--echo alpha--foxtrot");
  });

  test("block with a mix helper", () => {
    expect(sut(({ mix }) => mix`px-5`)).toBe("alpha px-5");
  });

  test("block with a mix helper and a parent mix", () => {
    expect(sut(({ mix }) => mix`px-5`, "parent-mix")).toBe(
      "alpha parent-mix px-5",
    );
  });

  test("block with a modifier & mix", () => {
    expect(sut(({ block }) => block`bravo`.mix`px-5`)).toBe(
      "alpha alpha--bravo px-5",
    );
  });

  test("block with modifier and advanced mix", () => {
    expect(
      sut(({ block }) => block`bravo`.mix`px-5 ${"foo"} ${{ bar: true }}`),
    ).toBe("alpha alpha--bravo px-5 foo bar");
  });

  test("element with simple modifier", () => {
    expect(sut(({ element }) => element`bravo`)).toBe("alpha__bravo");
  });

  test("element with a mix", () => {
    expect(sut(({ element }) => element`bravo`.mix`px-2`)).toBe(
      "alpha__bravo px-2",
    );
  });

  test("element with modifiers and a mix shorthand", () => {
    expect(sut(({ element }) => element`bravo ${{ charlie: true }} px-2`)).toBe(
      "alpha__bravo alpha__bravo--charlie px-2",
    );
  });
  test("element skipping modifiers but with a mix shorthand", () => {
    expect(sut(({ element }) => element`bravo ${null} px-2`)).toBe(
      "alpha__bravo px-2",
    );
  });
});
