<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="pageHandler(pageNo - 1)">上一页</button>
        <button v-show="startNumAndEndNum.start > 1" @click="pageHandler(1)" :class="{ active: pageNo == 1 }">1</button>
        <button v-show="startNumAndEndNum.start > 2">···</button>

        <button v-for="page in continues" :key="page" @click="pageHandler(startNumAndEndNum.start + page - 1)"
            :class="{ active: pageNo == startNumAndEndNum.start + page - 1 }">{{ startNumAndEndNum.start + page - 1
            }}</button>
        <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-show="startNumAndEndNum.end < totalPage" @click="pageHandler(totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="pageHandler(pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        startNumAndEndNum() {
            let start = 0, end = 0;
            //考虑总页数比连续页数少的情况
            if (this.totalPage < this.continues) {
                start = 1;
                end = this.totalPage;
            } else {
                start = this.pageNo - parseInt(this.continues / 2);
                end = this.pageNo + parseInt(this.continues / 2);
                if (start < 1) {
                    start = 1;
                    end = this.continues;
                } else if (end > this.totalPage) {
                    start = this.totalPage - this.continues + 1;
                    end = this.totalPage
                }
            }
            return { start, end };
        }
    },
    methods: {
        pageHandler(pageNew) {
            this.$emit("pageInfo", pageNew);
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}</style>