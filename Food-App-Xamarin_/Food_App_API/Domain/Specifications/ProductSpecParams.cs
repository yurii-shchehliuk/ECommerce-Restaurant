namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber{get; set;} = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? CategoryId { get; set; }
        public string SortSelected { get; set; }
        private string _search;
        public string Search 
        { 
            get => _search;
            set => _search = value.ToLower();
        }
    }
}