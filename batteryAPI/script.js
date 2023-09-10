const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);
const batteryStatus = document.querySelector(".batteryStatus");
//Batter API

const battery = () => {
  if ("getBattery" in navigator) {
    navigator.getBattery().then(battery => {
      function updateAllBatteryDetails() {
        updateChrgingInfo();
        updateLevelChange();
        updateDischargingTimeInfo();
        updateChargingTimeChangeInfo();
        updateStatusOfBattery();
      }
      updateAllBatteryDetails();
      //Battery Charging change
      battery.addEventListener("chargingchange", () => {
        updateChrgingInfo();
      });
      function updateChrgingInfo() {
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }

      //Battery charging time
      battery.addEventListener("chargingtimechange", () => {
        updateChargingTimeChangeInfo();
      });
      function updateChargingTimeChangeInfo() {
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }
      //Battery Discharging time
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTimeInfo();
      });
      function updateDischargingTimeInfo() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }
      //Battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });

      function updateLevelChange() {
        const level = battery.level * 100 + "%";
        batteryLevel.innerHTML = level;
      }
      //Battery status
      battery.addEventListener("knowStatus", () => {
        updateStatusOfBattery();
      });
      function updateStatusOfBattery() {
        const status = function (batteryLev) {
          if (battery.level == 1) return "Fully Charged 100%";
          else if (battery.level <= 0.4) return "Battery Low!(Less than 40%)";
          else return "Please charge";
        };
        batteryStatus.innerHTML = status(battery.level);
      }
    });
  }
};

battery();
