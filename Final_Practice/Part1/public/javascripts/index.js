// eslint-disable-next-line no-undef
let vueinst = new Vue({
    el: '#vue_selector',
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            };
            return statusMap[status];
        },
    },
    data() {
        return {
            tableKey: 0,
            listLoading: true,
            listQuery: {
                facilities: '',
                rating: '',
                date: '',
                size: '',
            },
            importanceOptions: [1, 2, 3],
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: 'Edit',
                create: 'Create'
            },
            dialogPvVisible: false,
            // pvData: [],
            rules: {
                //   // type: [{ required: true, message: 'type is required', trigger: 'change' }]
                //   // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                //   // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
            // downloadLoading: false,
            // our data
            myData: [
                {
                    room_id: 0,
                    size: 0,
                    facilities: "",
                    name: "",
                    description: "",
                    street_address: "",
                    booked_by: ""
                }
            ]
        };
    },
    created() {
        this.getList();
    },
    methods: {
        fetchRoomList(){
            // eslint-disable-next-line no-undef
            return axios.post('/search',{
                facilities: this.listQuery.facilities,
                rating: this.listQuery.rating,
                date: this.listQuery.date,
                size: this.listQuery.size,
            });
        },
        getList() {
            this.listLoading = true;
            this.fetchRoomList(this.listQuery).then(response => {
                this.myData = response.data;
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            });
        },
        handleFilter() {
            // this.listQuery.size = 1;
            this.getList();
        }
    }
});
