import SingleCellArea from "@/solver/technique/SingleCellArea";
import OneRowWideArea from "@/solver/technique/OneRowWideArea";
import Technique from "@/solver/technique/Technique";
import Transposing from "@/solver/technique/Transposing";
import SingleNeighbouringCells from "@/solver/technique/SingleNeighbouringCells";
import CellSeenByAllOfAnotherRegions from "@/solver/technique/CellSeenByAllOfAnotherRegions";
import LastSpotForRow from "@/solver/technique/LastSpotForRow";
import OnlySingleRegionInRow from "@/solver/technique/OnlySingleRegionInRow";

export default class TechniquesFactory {
  static *make(): Generator<Technique> {
    yield new SingleCellArea();
    yield new OneRowWideArea();
    yield new Transposing(new OneRowWideArea());
    yield new SingleNeighbouringCells();
    yield new Transposing(new SingleNeighbouringCells());
    yield new CellSeenByAllOfAnotherRegions();
    yield new LastSpotForRow();
    yield new Transposing(new LastSpotForRow());
    yield new OnlySingleRegionInRow();
    yield new Transposing(new OnlySingleRegionInRow());
  }
}
