import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import { TickItem } from "components/TickItem";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {
    console.log(blocks)
    return blocks.map((block) => {
        switch(block.name) {
            case "acf/tick-item": {
                return <TickItem key={block.id} >
                    <BlockRenderer blocks={block.innerBlocks} />
                </TickItem>
            }
            case 'core/gallery': {
                return <Gallery
                    key={block.id}
                    columns={block.attributes.columns || 3}
                    cropImages={block.attributes.imageCrop}
                    items = {block.innerBlocks} 
                />
            }
            case 'acf/property-features' : {
                return <PropertyFeatures 
                key={block.id} 
                price={block.attributes.price} 
                bedrooms={block.attributes.bedrooms} 
                bathrooms={block.attributes.bathrooms} 
                hasParking={block.attributes.has_parking} 
                petFriendly={block.attributes.pet_friendly} 
                 />
            }
            case "acf/formspree-form" : {
                return <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
            }
            case "acf/cta-button": {
                return <CallToActionButton key={block.id}
                buttonLabel={block.attributes.data.label} 
                destination={block.attributes.data.destination}
                align={block.attributes.data.align} />
            }
            case 'core/paragraph' : {
                return <Paragraph 
                key={block.id} 
                textAlign={block.attributes?.style?.typography?.textAlign} 
                textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text} 
                content={block.attributes.content}/>
            }
            case 'core/post-title':
            case 'core/heading': {
                return <Heading key={block.id} content={block.attributes.content} level={block.attributes.level} textAlign={block.attributes?.style?.typography?.textAlign}/>
            }
            case 'core/cover': {
                return <Cover key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks}/>
                </Cover>
            }
            case "acf/property-search": {
                return <PropertySearch key={block.id} />
            }
           
            case "core/post-title": {
                return null;
            }

            case "core/post-content": {
                return (
                    <div key={block.id}>
                        <BlockRenderer
                            blocks={block.innerBlocks || []}
                        />
                    </div>
                );
            }
            case "core/columns": {
                console.log("COLUMNS: ", block.attributes);
                return (
                    <Columns 
                        key={block.id} 
                        isStackedOnMobile={block.attributes.isStackedOnMobile}
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text} 
                        backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
                        >
                            <BlockRenderer blocks={block.innerBlocks} />
                    </Columns>
                )
            }
            case "core/column": {
                console.log("COLUMN: ", block);
                const backgroundColor =
        theme?.[block.attributes?.backgroundColor] ||
        block.attributes?.style?.color?.background;
        const textColor=theme[block.attributes?.textColor] || block.attributes?.style?.color?.text ;
                return <Column 
                key={block.id} width={block.attributes?.width} 
                backgroundColor={backgroundColor}
                textColor = {textColor}
            
                >
                    <BlockRenderer blocks={block.innerBlocks} />
                </Column>
            }
            case "core/group":
            case "core/block": {
                return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
            }
            case "core/image": {
                return (
                    <Image
                        key={block.id}
                        src={block.attributes.url}
                        height={block.attributes.height}
                        width={block.attributes.width}
                        alt={block.attributes.alt || ""}
                    />
                )
            }
            default:
                console.log("UNKNOWN: ", block)
                return null;
        }
    })

}