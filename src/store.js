import {createEffect, createEvent, createStore} from 'effector'


export const fetchSearch = createEffect(url => fetch(url).then(req => req.json()))
export const $resultData = createStore(null).on(
  fetchSearch.doneData, (state, result) => result.items,
)

export const fetchAuthorQuestions = createEffect(url => fetch(url).then(req => req.json()))
export const $authorQuestionsData = createStore(null).on(
  fetchAuthorQuestions.doneData, (state, result) => result.items,
)

export const fetchAnswers = createEffect(url => fetch(url).then(req => req.json()))
export const $answers = createStore(null).on(
  fetchAnswers.doneData, (state, result) => result.items,
)

export const fetchTags = createEffect(url => fetch(url).then(req => req.json()))
export const $tags = createStore(null).on(
  fetchTags.doneData, (state, result) => result.items,
)

export const modalOpen = createEvent()
export const modalClose = createEvent()
export const $storeModal = createStore(false)
  .on(modalOpen, (store) => !store)
  .on(modalClose, (store) => !store)

