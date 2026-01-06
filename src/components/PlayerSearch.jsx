import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const PlayerSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search players..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-card border-border"
      />
    </div>
  );
};

export default PlayerSearch;
