import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) { }

  // addCronJob(name: string, seconds: string) {
  //   const job = new CronJob(`${seconds} * * * * *`, () => {
  //     console.warn(`time (${seconds}) for job ${name} to run!`)
  //   })

  //   this.schedulerRegistry.addCronJob(name, job)
  //   job.start()

  //   console.warn(`job ${name} added for each minute at ${seconds} seconds!`)
  // }

  // deleteCron(name: string) {
  //   this.schedulerRegistry.deleteCronJob(name)
  // }

  // getCronJob(name: string) {
  //   return this.schedulerRegistry.getCronJob(name)
  // }

  addTimeout(name: string, timeString: number | string, callback) {
    const timeout = setTimeout(callback, +new Date(timeString) - +new Date())
    this.schedulerRegistry.addTimeout(name, timeout)
  }

  deleteTimeout(name: string) {
    let timeout
    try {
      timeout = this.schedulerRegistry.getTimeout(name)
    } catch (e) { }
    if (!timeout) return
    clearTimeout(timeout)
    this.schedulerRegistry.deleteTimeout(name)
  }

  getTimeout(name: string) {
    return this.schedulerRegistry.getTimeout(name)
  }
}
