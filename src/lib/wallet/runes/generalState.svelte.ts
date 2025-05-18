
class GeneralState {
 autoLockTimer = $state(15);
 isLocked = $state(true);
 isAutoLock = $state(true);
}

export const generalState = new GeneralState();