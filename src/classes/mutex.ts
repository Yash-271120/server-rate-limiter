class Mutex {
    private locked: boolean;
    private queue: (() => void)[];
  
    constructor() {
      this.locked = false;
      this.queue = [];
    }
  
    public acquire(): Promise<() => void> {
      return new Promise((resolve) => {
        const acquireLock = () => {
          if (!this.locked) {
            this.locked = true;
            resolve(this.release.bind(this)); // Return release function
          } else {
            this.queue.push(acquireLock);
          }
        };
        acquireLock();
      });
    }
  
    public release(): void {
      if (!this.locked) {
        throw new Error('Mutex is not locked');
      }
      this.locked = false;
      const next = this.queue.shift();
      if (next) {
        next(); // Execute next queued lock
      }
    }
  }
  
  export default Mutex;
  