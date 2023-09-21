import _chunk from 'lodash/chunk';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  computed: {
    prevButton() {
      return '<i class="material-icons">chevron_left</i>';
    },
    nextButton() {
      return '<i class="material-icons">chevron_right</i>';
    }
  },
  methods: {
    onPageChange(page) {      
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0]; 
    },
    setupPaginate(allItems, pageSize = this.pageSize) {
      this.pageSize = pageSize;
      this.allItems = _chunk(allItems, this.pageSize);
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page -1] || this.allItems[0]; 
    }
  }
}