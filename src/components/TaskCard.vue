<script setup>
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// console.log('Task prop:', props.task)
const _handleTaskCompletion = async () => {
  task.is_complete = !task.is_complete
  tasksStore.updateExistingTask(task)
  // console.log(task)
}

const { task } = props

const _deleteTask = async () => {
  tasksStore.deleteExistingTask(task)
  tasksStore.fetchAllTasks()
}

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}
</script>

<template>
  <div class="card-container">
    <div class="card-card">
      <div class="card-heading">
        <div class="card-title">
          <span class="card-text">
            <span>{{ task.title }}</span>
          </span>
        </div>
        <div class="card-completedcheckbox">
          <span class="card-text2">
            <input
              type="checkbox"
              name="completed"
              :checked="task.is_complete"
              @change="_handleTaskCompletion"
            />
          </span>
        </div>
      </div>
      <div class="card-body">
        <span class="card-text4">
          <span>Created on:</span>
        </span>
        <div class="card-timestamp">
          <span class="card-text6">
            <span>{{ formatTimestamp(task.inserted_at) }}</span>
          </span>
          <span class="card-text8">
            <button @click="_deleteTask()">Delete</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  overflow: auto;
  /* min-height: 100vh; */
  align-items: center;
  flex-direction: column;
}
.card-card {
  gap: 12px;
  width: 392px;
  height: auto;
  display: flex;
  padding: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.10000000149011612);
  align-items: flex-start;
  border-radius: 8px;
  flex-direction: column;
  background-color: rgb(110, 178, 245);
}
.card-heading {
  gap: 207px;
  width: 352px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  justify-content: space-between;
}
.card-title {
  gap: 10px;
  width: 125px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  justify-content: space-between;
}
.card-text {
  color: rgba(17, 24, 39, 1);
  width: 125px;
  height: auto;
  font-size: 18px;
  font-style: SemiBold;
  text-align: left;
  font-family: Roboto;
  font-weight: 600;
  line-height: 28px;
  font-stretch: normal;
  text-decoration: none;
}
.card-completedcheckbox {
  gap: 10px;
  height: 20px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
}
.card-text2 {
  color: rgba(37, 99, 235, 1);
  width: 20px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
}
.card-body {
  display: flex;
  align-items: center;
}
.card-text4 {
  color: rgba(55, 65, 81, 1);
  width: 89px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
}
.card-timestamp {
  gap: 10px;
  display: flex;
  align-items: center;
}
.card-text6 {
  color: rgba(55, 65, 81, 1);
  width: 184px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
}
</style>
