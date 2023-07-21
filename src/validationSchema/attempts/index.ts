import * as yup from 'yup';

export const attemptValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  analysis: yup.string().required(),
  question_paper_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
