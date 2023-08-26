import React from "react";
import Slider from "@mui/material/Slider";
import "./SliderRange.css";

interface SliderRangeProps {
  maxPrice: number | null;
  setMaxPrice: (newValue: number | null) => void;
}

const SliderRange: React.FC<SliderRangeProps> = ({ maxPrice, setMaxPrice }) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMaxPrice(newValue as number);
  };

  return (
    <div className="price_range">
      <div>
        <p>Set Price Range</p>
        <Slider
          sx={{
            position: "relative",
            maxWidth: "100px",
            zIndex: "1",
          }}
          value={maxPrice === null ? 5000 : maxPrice}
          onChange={handleSliderChange}
          min={0}
          max={10000}
          step={10}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
};

export default SliderRange;
