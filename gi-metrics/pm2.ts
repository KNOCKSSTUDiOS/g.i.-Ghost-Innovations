import pm2 from "pm2";

export function getPm2Metrics(): Promise<any> {
  return new Promise(resolve => {
    pm2.connect(() => {
      pm2.list((err, list) => {
        if (err) return resolve({ error: "PM2 error" });

        const data = list.map(proc => ({
          name: proc.name,
          pid: proc.pid,
          status: proc.pm2_env.status,
          cpu: proc.monit.cpu,
          memory: proc.monit.memory,
          uptime: proc.pm2_env.pm_uptime
        }));

        pm2.disconnect();
        resolve(data);
      });
    });
  });
}

