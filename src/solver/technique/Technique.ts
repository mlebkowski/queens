import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";

export default interface Technique {
  deduct(areas: AreaCollection): Deduction[];
}
