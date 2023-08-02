
export type LessonsTypes = 'full_video' | 'video' | 'webinar' | 'text' | 'homework' | 'test' | 'offline' | 'constructor';

export type CompanyCode =
  'apo' |
  'cpm' |
  'koala' |
  'matem' |
  'olphys' |
  'mgimo' |
  'espanol-cpm' |
  'mccme' |
  'science-edu' |
  'juniormgimo';

export interface User {
  email: string
  id?: number
  photo?: null | string
  photo_color?: string
  socials?: unknown[]
  name: string
  surname?: string
}

export interface File {
  collection_name: string
  created_at: string | null | Date
  disk: string
  file_name: string
  id: number
  link: string
  mime_type: string
  model_id: number
  model_type: string
  name: string
  order_column: number
  size: number
  updated_at: string | null | Date
}

export interface Category {
  id: number;
  company_id: number;
  parent_category_id: null | number;
  type: 'category' | 'subcategory';
  title: string;
  description: null;
  sort: number | null;
  created_at: string | null | Date;
  updated_at: string | null | Date;
  deleted_at: string | null | Date;
  course_catalog_column_count: number | null;
  course_catalog_filter_selection_type: 'multiple' | 'single';
  course_catalog_view_type: 'row' | 'column';
  course_catalog_visible: boolean;
  slug: string;
  subcategories: Category[];
  value?: Partial<{title: string, subcategory: Category}> | Array<Partial<{title: string, subcategory: Category}>>;
  patent_id?: number | string;
}



export interface Group {
  company_id: number
  id: number
  name: string
}

export interface Role {
  code: string
  company_id: number
  id: number
  name: string
  priority: number
}

export interface Permissions {
  tests_statistics: boolean
  learn_courses: boolean
  learn_tests: boolean
  courses_catalog: boolean
  course_bid: boolean
  course_self_bid: boolean
  pay_course: boolean
  course_gift: boolean
  connect_users: boolean
  users_observer: boolean
  increased_users_observer: boolean
  teacher_courses_and_lessons_access_all: boolean
  teacher_courses_and_lessons_access_my: boolean
  teacher_department: boolean
  teacher_edit_lessons: boolean
  teacher_edit_user_wave_results: boolean
  teacher_edit_tests: boolean
  teacher_check_homework: boolean
  teacher_check_test_all: boolean
  teacher_check_test_my: false
  teacher_offline_lessons: boolean
  teacher_journal: boolean
  teacher_webinar_lessons: boolean
  teacher_manage_chat: boolean
  teacher_feedback_on_user_comments: boolean
  teacher_salary: boolean
}

export type LessonStatus = 'pass' | 'closed' | 'opened' | 'checking' | 'successful' | 'fail'

export interface Field {
  id: number,
  form_id: number,
  company_id: number,
  custom_field_id: number | null,
  parent_field_id: number | null,
  sort: number,
  type: string,
  subtype: string, // когда у Вадима будет время спросить про type и ыгиензу
  load_relation: boolean,
  use_relation_custom_field: boolean,
  text: string | null,
  placeholder: string | null,
  foreign_id: number | null,
  required: boolean,
  visible: boolean,
  default_value: string | number,
  created_at: string,
  updated_at: string | null,
  deleted_at: null,
  values: string | number | Field[] | null,
  custom_field: Field | null,
  multiple: null,
  value: string | null
}
export interface Invite {
  id: number,
  type: string, // узнать типы
  code: string,
  active: boolean,
  name: string,
  description: string | null,
  invite_custom_fields: Field[] | null
}

export interface VFormType extends HTMLFormElement {
  validate():boolean
  resetValidation():void
  reset():void
}

export type SetProperty<S> = <T extends keyof S>(payload: {name: T, value: S[T]} | Array<{name: T, value: S[T]}>) => void

type SetPropertyMutation<S> = <T extends keyof S>(state: S, payload: {name: T, value: S[T]} | Array<{name: T, value: S[T]}>) => void

export type MixinMutations = <S>() => {
  setProperty: SetPropertyMutation<S>
}
