import { CiSearch } from "react-icons/ci";
import propTypes from "prop-types";

const SearchInputContainer = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="input-group mb-5">
      <div className="input-group-prepend">
        <span className="input-group-text rounded-0" id="basic-addon1">
          <CiSearch size={25} />
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="search"
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

SearchInputContainer.propTypes = {
  searchTerm: propTypes.string.isRequired,
  handleSearchChange: propTypes.func.isRequired,
};

export default SearchInputContainer;
