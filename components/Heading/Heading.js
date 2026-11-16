import React from "react"
import { getFontSizeForHedaing, getTextAlign } from "utils/fonts"

export const Heading = ({ textAlign, content, level = 2 }) => {
    const tag = React.createElement(`h${level}`, {
        dangerouslySetInnerHTML: { __html: content },
        className: ` font-heading font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHedaing(level)} ${getTextAlign(textAlign)}`
    });

    return tag;
}