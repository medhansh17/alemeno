import { Input } from "@chakra-ui/react";

interface SearchBoxProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox = (props: SearchBoxProps) => {
  return (
    <Input
      placeholder={props.placeholder}
      size="lg"
      variant="filled"
      borderRadius="full"
      onChange={props.onChange}
      width={["90%", "70%", "50%"]}
    />
  );
};
