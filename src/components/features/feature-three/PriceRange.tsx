"use client"
import { getTrackBackground, Range } from "react-range";
// prop type 
type IProps = {
   STEP: number;
   MIN: number;
   MAX: number;
   values: number[];
   handleChanges: (val: number[]) => void
}
const PriceRange = ({ STEP, MIN, MAX, values, handleChanges }: IProps) => {
   return (
      <>
         <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={values}
            onChange={(vals) => handleChanges(vals)}
            renderTrack={({ props, children }) => (
               <div
                  {...props}
                  key='track'
                  style={{
                     ...props.style,
                     height: '8px',
                     width: '100%',
                     borderRadius: "10px",
                     background: getTrackBackground({
                        values: values,
                        colors: ["#F0E9FF", "#560ce3", "#F0E9FF"],
                        min: MIN,
                        max: MAX
                     }),
                  }}
               >
                  {children}
               </div>
            )}
            renderThumb={({ props, index }) => (
               <div
                  {...props}
                  key={`thumb-${index}`}
                  className="ui-input"
                  style={{
                     ...props.style,
                     height: '20px',
                     width: '20px',
                     backgroundColor: "#560ce3",
                     outline: "none",
                     borderRadius: "50px",
                     border: "6px solid #ffffff",
                     boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.3)"
                  }}
               />
            )}
         />
      </>
   );
};


export default PriceRange;