import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  value: string;
  onValueChange: (v: string) => void;
};

export function ShiftSelector({ value, onValueChange }: Props) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="SHIFT_1">Early</TabsTrigger>
        <TabsTrigger value="SHIFT_2">Late</TabsTrigger>
        <TabsTrigger value="SHIFT_3">Night</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ShiftSelector;
