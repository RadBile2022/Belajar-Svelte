export const MODULE_NAME = "lms";

export type ModuleApiRoute = {
  /* GEN-ADD: type */
  enrollmentRoute: string;
  chapterRoute: string;
  quizRoute: string;
  jobSheetRoute: string;
  instructorRoute: string;
  studentRoute: string;
  courseRoute: string;
  bookRoute: string;
  /* GEN-END: type */
};

export const getModuleApiRoute = (): ModuleApiRoute => {
  const base = MODULE_NAME;
  return {
    /* GEN-ADD: route */
    enrollmentRoute: `${base}/enrollment`,
    chapterRoute: `${base}/chapter`,
    quizRoute: `${base}/quiz`,
    jobSheetRoute: `${base}/jobSheet`,
    instructorRoute: `${base}/instructor`,
    studentRoute: `${base}/student`,
    courseRoute: `${base}/course`,
    bookRoute: `${base}/book`
    /* GEN-END: route */
  };
};
