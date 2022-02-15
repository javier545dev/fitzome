/**
 * General app events
 */
export enum AppEvents {
  event_too_large = 'ERR_EVENT_TOO_LARGE',
  get_storaged_value_err = 'ERR_GETTING_STORAGE_VALUE',
  set_storaged_value_err = 'ERR_SETTING_STORAGE_VALUE',
}
/**
 * Initial screens
 */
export enum InitialScreenEvents {
  // Wellcome screen
  singup_pressed = 'SINGUP_BTN_PRESSED',
  login_pressed = 'LOGIN_BTN_PRESSED',
  // Login screen
  login_screen_visited = 'LOGIN_SCREEN_VISITED',
  login_with_facebook_started = 'LOGIN_WITH_FACEBOOK_STARTED',
  login_with_facebook_cancelled = 'LOGIN_WITH_FACEBOOK_CANCELLED',
  login_with_facebook_successful = 'LOGIN_WITH_FACEBOOK_SUCCESSFUL',
  login_with_facebook_req_failed = 'LOGIN_WITH_FACEBOOK_REQ_FAILED',
  login_with_facebook_failed = 'LOGIN_WITH_FACEBOOK_FAILED',
  login_with_facebook_completed = 'LOGIN_WITH_FACEBOOK_COMPLETED',
  login_with_google_started = 'LOGIN_WITH_GOOGLE_STARTED',
  login_with_google_successfull = 'LOGIN_WITH_GOOGLE_SUCCESSFUL',
  login_with_google_cancelled = 'LOGIN_WITH_GOOGLE_CANCELLED',
  login_with_google_in_progress = 'LOGIN_WITH_GOOGLE_IN_PROGRESS',
  login_with_google_not_available = 'LOGIN_WITH_GOOGLE_NOT_AVAILABLE',
  login_with_google_failed = 'LOGIN_WITH_GOOGLE_FAILED',
  login_with_google_completed = 'LOGIN_WITH_GOOGLE_COMPLETED',
  // Singup screen
  signup_screen_visited = 'SIGNUP_SCREEN_VISITED',
  signup_with_facebook_started = 'SIGNUP_WITH_FACEBOOK_STARTED',
  signup_with_facebook_cancelled = 'SIGNUP_WITH_FACEBOOK_CANCELLED',
  signup_with_facebook_successful = 'SIGNUP_WITH_FACEBOOK_SUCCESSFUL',
  signup_with_facebook_req_failed = 'SIGNUP_WITH_FACEBOOK_REQ_FAILED',
  signup_with_facebook_failed = 'SIGNUP_WITH_FACEBOOK_FAILED',
  signup_with_facebook_completed = 'SIGNUP_WITH_FACEBOOK_COMPLETED',
  signup_with_google_started = 'SIGNUP_WITH_GOOGLE_STARTED',
  signup_with_google_successfull = 'SIGNUP_WITH_GOOGLE_SUCCESSFUL',
  signup_with_google_cancelled = 'SIGNUP_WITH_GOOGLE_CANCELLED',
  signup_with_google_in_progress = 'SIGNUP_WITH_GOOGLE_IN_PROGRESS',
  signup_with_google_not_available = 'SIGNUP_WITH_GOOGLE_NOT_AVAILABLE',
  signup_with_google_failed = 'SIGNUP_WITH_GOOGLE_FAILED',
  signup_with_google_completed = 'SIGNUP_WITH_GOOGLE_COMPLETED',
  // Create account
  create_account_screen_visited = 'CREATE_ACCOUNT_SCREEN_VISITED',
  create_account_started = 'CREATE_ACCOUNT_STARTED',
  create_account_last_screen = 'CREATE_ACCOUNT_LAST_SCREEN',
  create_account_btn_pressed = 'CREATE_ACCOUNT_BTN_PRESSED',
  create_account_no_internet = 'CREATE_ACCOUNT_NO_INTERNET',
  create_account_save_online_fail = 'CREATE_ACCOUNT_SAVE_ONLINE_FAIL',
  create_account_save_local_failed = 'CREATE_ACCOUNT_SAVE_LOCAL_FAILED',
  create_account_successful = 'CREATE_ACCOUNT_SUCCESSFUL',
  // Others
  no_account_found = 'NO_ACCOUNT_FOUND',
}

export enum CoachEvents {
  coach_start_speach_fail = 'COACH_START_SPEACH_FAIL',
}

export type AnalyticsEventType = AppEvents | InitialScreenEvents | CoachEvents;
