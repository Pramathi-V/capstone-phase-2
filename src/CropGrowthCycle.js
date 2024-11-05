import React, { useState } from "react";

const CropGrowthCycle = () => {
  const [growthStage, setGrowthStage] = useState("");

  return (
    <div>
      <h2>Crop Growth Cycle (Preventative methods)</h2>
      <div>
        <label>Growth Stage:</label>
        <select
          value={growthStage}
          onChange={(e) => setGrowthStage(e.target.value)}
        >
          <option value="Nursery">Nursery</option>
          <option value="Transplanting">Transplanting</option>
          <option value="Flowering">Flowering</option>
          <option value="Mature">Mature</option>
        </select>
      </div>
    </div>
  );
};

export default CropGrowthCycle;
