import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const PlayerFilters = ({ filters, onFiltersChange }) => {
  const handleScoreRangeChange = (value) => {
    onFiltersChange({ ...filters, scoreRange: value });
  };

  const handleMatchesRangeChange = (value) => {
    onFiltersChange({ ...filters, matchesRange: value });
  };

  const hasActiveFilters = 
    filters.scoreRange[0] > 0 || 
    filters.scoreRange[1] < 100 || 
    filters.matchesRange[0] > 0 || 
    filters.matchesRange[1] < 50;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-display uppercase text-sm">Score Range</Label>
              <span className="text-sm text-muted-foreground">
                {filters.scoreRange[0]} - {filters.scoreRange[1]}
              </span>
            </div>
            <Slider
              value={filters.scoreRange}
              onValueChange={handleScoreRangeChange}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-display uppercase text-sm">Matches Played</Label>
              <span className="text-sm text-muted-foreground">
                {filters.matchesRange[0]} - {filters.matchesRange[1]}
              </span>
            </div>
            <Slider
              value={filters.matchesRange}
              onValueChange={handleMatchesRangeChange}
              min={0}
              max={50}
              step={1}
              className="w-full"
            />
          </div>

          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => onFiltersChange({ 
              scoreRange: [0, 100], 
              matchesRange: [0, 50] 
            })}
          >
            Reset Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlayerFilters;
