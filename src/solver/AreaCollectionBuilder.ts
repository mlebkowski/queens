import Cell from "@/solver/Cell";
import Area from "@/solver/Area";
import PointValue from "@/solver/PointValue";
import AreaCollection from "@/solver/AreaCollection";

export default class AreaCollectionBuilder {
  private areas: Record<string, Area> = {};

  add(cell: Cell): AreaCollectionBuilder {
    const key = `${cell.color.red}/${cell.color.green}/${cell.color.blue}`;
    const area =
      this.areas[key] || (this.areas[key] = Area.ofColor(cell.color));
    area.add(new PointValue(cell.point, cell.value));
    return this;
  }

  build(): AreaCollection {
    return new AreaCollection(Object.values(this.areas));
  }
}
