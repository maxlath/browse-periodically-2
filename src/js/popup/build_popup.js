const _ = require('../lib/utils')
const bookmarks = require('../lib/bookmarks')

const optionsEl = require('./periodicity_options')
const addCustomFrequencyButton = require('./add_custom_frequency_button')(optionsEl)
require('./footer')
const updateNextVisit = require('./next_visit')

module.exports = function buildPopup (bookmarkData) {
  if (bookmarks.isInFolder(bookmarkData)) {
    const parsedData = bookmarks.parse(bookmarkData)
    if (parsedData) {
      updateNextVisit(parsedData.nextVisit)
      select(`.frequency-${parsedData.frequency}`)
    } else {
      console.error('bookmark in folder but impossible to parse data', bookmarkData)
      select('.never')
    }
  } else {
    select('.never')
  }
}

function select (selector) {
  const el = document.querySelector(selector)
  if (el) {
    el.classList.add('selected')
  } else {
    addCustomFrequencyButton()
  }
}
