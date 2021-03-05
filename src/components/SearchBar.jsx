import { Search } from "baseui/icon";
import { Input } from "baseui/input";

export const SearchBar = (props) => {
  return (
    <Input
      placeholder="Search"
      startEnhancer={<Search size={20} />}
      {...props}
    />
  );
};
