<template>
  <div class="table-container">
    <div class="search-container">
      <input
          type="text"
          placeholder="Поиск..."
          :value="searchQuery"
          @input="handleSearchInput"
      />
      <p v-if="!searchExists">Ничего не найдено</p>
    </div>

    <table v-if="searchExists">
      <thead>
      <tr>
        <th v-for="column in props.columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
        <td v-for="column in props.columns" :key="column.key">
          {{ row[column.key] }}
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="searchExists" class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">
        Предыдущая
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">
        Следующая
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  rows: Record<string, any>[];
  pageSize?: number;
}

const props = defineProps<TableProps>();

// states
const searchQuery = ref<string>('');
const currentPage = ref<number>(1);
const rowsPerPage = ref<number>(props.pageSize ?? 5);

// computed properties
const filteredRows = computed(() => {
  if (!searchQuery.value) {
    return props.rows;
  }
  const query = searchQuery.value.toLowerCase();
  return props.rows.filter((row: string | any) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(query)
    )
  );
});
const searchExists = computed(() => filteredRows.value.length > 0);
const totalPages = computed(() =>
    Math.ceil(filteredRows.value.length / rowsPerPage.value)
);
const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage.value);
const endIndex = computed(() => currentPage.value * rowsPerPage.value);
const paginatedRows = computed(() =>
    filteredRows.value.slice(startIndex.value, endIndex.value)
);

// functions
const goToPreviousPage = (): void => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
const goToNextPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
const handleSearchInput = (event: Event): void => {
  searchQuery.value = (event.target as HTMLInputElement).value;
  currentPage.value = 1;
}
</script>

<style scoped lang="scss">
.table-container {
  max-width: 100%;
  overflow-x: auto;
  padding: 1rem;

  .search-container {
    margin-bottom: 1rem;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #90caf9;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;

    thead {
      background-color: #e3f2fd;
    }

    th, td {
      padding: 0.75rem 1rem;
      border: 1px solid #ccc;
      text-align: left;
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      background-color: #90caf9;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:not(:disabled) {
        background-color: #64b5f6;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    span {
      margin: 0 0.5rem;
    }
  }
}
</style>