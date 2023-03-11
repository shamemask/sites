<template>
  <div id="app">
    <b-row align-h="center">
      <b-col class="py-5 col-md-auto"  >
        <img src="./assets/logo.png">
      </b-col>
    </b-row>
    <div>
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">Link 1</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        </b-navbar>
    </div>
    <b-row align-h="center">
      <b-col class="py-1" col-md-auto>
        <b-row><b-button block variant="success" size="lg">Button</b-button></b-row>
      </b-col>
    </b-row>
    <b-row  align-h="center">
      <b-col class="py-1" md="1" >
        <b-row class="float-sm-right" col-md-auto>
          <b-form-checkbox 
            id="checkbox-1"
            
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted" size="lg"
          >
            Chbox
          </b-form-checkbox>
        </b-row>
      </b-col>
    </b-row>
    <b-row  align-h="center" >
      <b-col class="py-1" md="2" >
        <div>
          <b-form-group >
            <b-form-checkbox-group
              v-model="checked"
              :options="options"
              plain
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </b-col> 
    </b-row>
    <b-row  align-h="center" >
      <b-col class="py-1" md="4" >
        <div>
          <b-form-input placeholder="Enter description"></b-form-input>
        </div>
      </b-col>
    </b-row>
    <b-row  align-h="center" >
      <b-col class="py-1" md="6" >
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Sort"
                label-for="sort-by-select"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
              >
                <b-input-group size="sm">
                  <b-form-select
                    id="sort-by-select"
                    v-model="sortBy"
                    :options="sortOptions"
                    :aria-describedby="ariaDescribedby"
                    class="w-75"
                  >
                    <template #first>
                      <option value="">-- none --</option>
                    </template>
                  </b-form-select>

                  <b-form-select
                    v-model="sortDesc"
                    :disabled="!sortBy"
                    :aria-describedby="ariaDescribedby"
                    size="sm"
                    class="w-25"
                  >
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Initial sort"
                label-for="initial-sort-select"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="initial-sort-select"
                  v-model="sortDirection"
                  :options="['asc', 'desc', 'last']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Filter"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                v-model="sortDirection"
                label="Filter On"
                description="Leave all unchecked to filter on all data"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  v-model="filterOn"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
                >
                  <b-form-checkbox value="number">Number</b-form-checkbox>
                  <b-form-checkbox value="str">String</b-form-checkbox>
                  <b-form-checkbox value="date">Date</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>

            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="Per page"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered"
          >
            <template #cell(number)="row">
              {{ row.value }}
            </template>

            <template #cell(actions)="row">
              <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Info modal
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </b-col>
    </b-row>
  </div> 
</template>

<script>
export default {
  
  data () {
    return {
      
      checked: false, // Должна быть ссылка на массив!
        options: [
          { text: 'Апельсин', value: 'orange' },
          { text: 'Яблоко', value: 'apple' }
        ],
        titles: [
          "Number", 
          "String", 
          "Date"
        ],
        data: [
          {number: 1,str: 'ABC',date: '2022-09-07'},
          {number: 2,str:  'DEF',date:  '2022-09-08'},
          {number: 3,str:  'GHI',date:  '2022-09-09'},
          {number: 4,str:  'JKL',date:  '2022-09-10'},
          {number: 5,str:  'MNO',date:  '2022-09-11'}
      ],
      items: [
          {number: 1,str: 'ABC',date: '2022-09-07'},
          {number: 2,str:  'DEF',date:  '2022-09-08'},
          {number: 3,str:  'GHI',date:  '2022-09-09'},
          {number: 4,str:  'JKL',date:  '2022-09-10'},
          {number: 5,str:  'MNO',date:  '2022-09-11'},
          {number: 6,str: 'PQR',date: '2022-09-12'},
          {number: 7,str:  'STU',date:  '2022-09-13'},
          {number: 8,str:  'VWX',date:  '2022-09-14'},
          {number: 9,str:  'YZ',date:  '2022-09-15'}, 
          {number: 10,str:  '$',date:  '2022-09-16'}
        ],
        fields: [
          { key: 'number', label: 'Number', sortable: true, sortDirection: 'desc' },
          { key: 'str', label: 'String', sortable: true, class: 'text-center' },
          {
            key: 'date',
            label: 'Date',
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
          }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    
  },
  
  checked: {
    checked(){
      return this.checked
    }
  },
  
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
}


</script>
<style>
    .jqx-panel {
        border: none
    }
</style>