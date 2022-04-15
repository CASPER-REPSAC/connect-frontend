import { useSearch } from "@/hooks";
import { SearchSVG } from "@/icons/SVGs";

const SearchInput = () => {
  const { sendSearchRequest, onChangeSearchInput } = useSearch();
  return (
    <div className="flex justify-between items-center">
      <input
        className="text-xl p-1 editable-placeholder w-full mr-1 text-text-800"
        spellCheck={false}
        placeholder="검색어를 입력하세요"
        onChange={(e) => {
          onChangeSearchInput({
            name: "keyword",
            value: e.target.value,
          });
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendSearchRequest();
          }
        }}
      />

      <button
        className="flex-none bg-background-700 text-text-50 px-2 py-1 rounded h-fit"
        onClick={() => {
          sendSearchRequest();
        }}
      >
        <SearchSVG />
      </button>
    </div>
  );
};

export { SearchInput };
