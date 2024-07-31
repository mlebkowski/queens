export default class Persistence {
  static save(colors: Color[]) {
    const byteArray = colors.reduce(
      (acc: number[], { red, green, blue }) => acc.concat([red, green, blue]),
      [],
    );

    window.location.hash = btoa(String.fromCharCode.apply(null, byteArray))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  static load(): Color[] {
    if (typeof window === "undefined") {
      return [];
    }

    const hash = window.location.hash
      .substring(1)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    if (!hash.length) {
      return [];
    }

    return [...atob(hash).match(/.../g)]
      .map((chunk) => [...chunk].map((c) => c.charCodeAt(0)))
      .map(([red, green, blue]) => ({ red, green, blue }));
  }
}
