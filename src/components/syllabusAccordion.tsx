import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export const SyllabusAccordion = ({
  syllabus,
}: {
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
}) => {
  return (
    <div className="mt-4 border-[#dcdcdc] border-[1px] ">
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        {syllabus.map((syllabus) => (
          <AccordionItem key={syllabus.week}>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <p className=" font-semibold">{syllabus.topic}</p>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p>{syllabus.content}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
