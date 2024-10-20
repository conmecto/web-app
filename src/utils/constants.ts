const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const locationLocalStorageKey = '_location_info_';
const locationLocalStorageExpireTimeMin = 1440;

export {
  emailRegex,
  passwordRegex,
  locationLocalStorageKey,
  locationLocalStorageExpireTimeMin
}