import { toast } from "react-toastify";

export default function SearchFormMovies({ onSearch, value, onSearch2 }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = form.elements.search.value;
    if (data.trim() === "") {
      toast.error("Please, enter your request!");
    }
    onSearch(data.trim());
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={value}
          onChange={(e) => onSearch2(e.target.value)}
          autoFocus
          autoComplete="off"
          placeholder="Search movies..."
        />
      </form>
    </header>
  );
}
