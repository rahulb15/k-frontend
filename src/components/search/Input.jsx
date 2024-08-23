// import React, { forwardRef } from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";

// const Validity = {
//     Neutral: "Neutral",
//     Valid: "Valid",
//     Invalid: "Invalid",
// };

// const colors = {
//     [Validity.Neutral]: (opacity) => `rgba(255, 205, 0, ${opacity})`,
//     [Validity.Valid]: (opacity) => `rgba(34, 204, 136, ${opacity})`,
//     [Validity.Invalid]: (opacity) => `rgba(255, 0, 85, ${opacity})`,
// };

// export const Input = forwardRef((props, ref) => {
//     const [validity, setValidity] = useState(Validity.Neutral);
//     const color = colors[validity];

//     return (
//         <motion.input
//         ref={ref}
//             initial={false}
//             animate={{
//                 boxShadow: `0 0 0 5px ${color(0.7)}, 0 0 0 4px ${color(0)}`,
//             }}
//             whileFocus={{
//                 boxShadow: `0 0 0 10px ${color(1)}, 0 0 0 50px ${color(0)}`,
//                 transition: {
//                     boxShadow: {
//                         duration: 0.3,
//                         from: `0 0 0 5px ${color(0.7)}, 0 0 0 4px ${color(1)}`,
//                     },
//                 },
//             }}
//             onBlur={(e) => {
//                 const { value } = e.currentTarget;
//                 if (!value) {
//                     setValidity(Validity.Neutral);
//                 } else if (value.includes(" ")) {
//                     setValidity(Validity.Invalid);
//                 } else {
//                     setValidity(Validity.Valid);
//                 }
//             }}
//         />
//     );
// });

// Input.displayName = 'Input';

import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Validity = {
    Neutral: "Neutral",
    Valid: "Valid",
    Invalid: "Invalid",
};

const colors = {
    [Validity.Neutral]: (opacity) => `rgba(255, 205, 0, ${opacity})`,
    [Validity.Valid]: (opacity) => `rgba(34, 204, 136, ${opacity})`,
    [Validity.Invalid]: (opacity) => `rgba(255, 0, 85, ${opacity})`,
};

export const Input = forwardRef(
    ({ value, onChange, placeholder, className, validityResult }, ref) => {
        console.log(validityResult, "validityResult");
        const [validity, setValidity] = useState(Validity.Neutral);
        console.log(validity, "validity");
        const color = colors[validity];

        const handleInputChange = (e) => {
            if (onChange) {
                onChange(e);
            }

            const { value } = e.target;
            if (!value) {
                setValidity(Validity.Neutral);
            } else if (value.includes(" ")) {
                setValidity(Validity.Invalid);
            } else {
                setValidity(Validity.Valid);
            }
        };

        useEffect(() => {
            if (validityResult) {
                setValidity(validityResult);
            }
        }, [validityResult]);

        return (
            <motion.input
                ref={ref}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={className}
                initial={false}
                animate={{
                    boxShadow: `0 0 0 5px ${color(0.7)}, 0 0 0 4px ${color(0)}`,
                }}
                whileFocus={{
                    boxShadow: `0 0 0 10px ${color(1)}, 0 0 0 20px ${color(0)}`,
                    transition: {
                        boxShadow: {
                            duration: 0.3,
                            from: `0 0 0 5px ${color(0.7)}, 0 0 0 4px ${color(
                                1
                            )}`,
                        },
                    },
                }}
            />
        );
    }
);

Input.displayName = "Input";
