import { useSearch } from "../context/SearchContext";
import {IconSearch} from '@tabler/icons-react'

function SearchInput() {
    const { searchTerm, setSearchTerm } = useSearch();
  
    return (
        <div className="relative px-4">
      <IconSearch className="absolute inset-y-0 left-6 top-2 flex items-center text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 py-2 border border-gray-300 dark:bg-transparent rounded-md shadow-sm focus:ring-orange-600 focus:border-orange-600 sm:text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    );
  }
  export default SearchInput;