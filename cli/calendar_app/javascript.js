var Cal = function(divId) {
  this.divId = divId;

  this.storageKey = 'calendar_notes_app';
  this.settingsKey = 'calendar_app_settings';

  this.settings = this.loadSettings();
  this.applySettings();

  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();

  this.notes = this.loadNotes();

  this.selectedDateKey = null;
  this.deleteSelection = [];
};

Cal.prototype.translations = {
  en: {
    back: 'Back',
    next: 'Next',
    settings: 'Settings',
    themes: 'Themes',
    weekStart: 'Start of Week',
    language: 'Language',
    standard: 'Standard',
    green: 'Green',
    red: 'Red',
    blue: 'Blue',
    softpink: 'Soft Pink',
    eu: 'EU',
    usa: 'USA',
    english: 'English',
    russian: 'Russian',
    german: 'German',
    french: 'French',
    makeNote: 'Make a Note',
    add: '+ Add',
    dayNotes: 'Day Notes',
    edit: 'Edit',
    delete: 'Delete',
    deleteNotes: 'Delete Notes',
    noNotesYet: 'No notes yet. Click "+ Add" to create your first note for this day.',
    noSavedNotes: 'No saved notes for this day.',
    noNotesToDelete: 'There are no saved notes to delete for this day.',
    note: 'Note',
    title: 'Title',
    untitled: 'Untitled',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    daysEU: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    daysUSA: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  },
  ru: {
    back: 'Назад',
    next: 'Далее',
    settings: 'Настройки',
    themes: 'Темы',
    weekStart: 'Начало недели',
    language: 'Язык',
    standard: 'Стандартный',
    green: 'Зелёный',
    red: 'Красный',
    blue: 'Синий',
    softpink: 'Нежно-розовый',
    eu: 'EU',
    usa: 'USA',
    english: 'Английский',
    russian: 'Русский',
    german: 'Немецкий',
    french: 'Французский',
    makeNote: 'Сделать заметку',
    add: '+ Добавить',
    dayNotes: 'Заметки дня',
    edit: 'Изменить',
    delete: 'Удалить',
    deleteNotes: 'Удалить заметки',
    noNotesYet: 'Пока нет заметок. Нажми "+ Добавить", чтобы создать первую заметку на этот день.',
    noSavedNotes: 'На этот день нет сохранённых заметок.',
    noNotesToDelete: 'Для этого дня нет заметок для удаления.',
    note: 'Заметка',
    title: 'Название',
    untitled: 'Без названия',
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    daysEU: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    daysUSA: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
  },
  de: {
    back: 'Zurück',
    next: 'Weiter',
    settings: 'Einstellungen',
    themes: 'Themen',
    weekStart: 'Wochenbeginn',
    language: 'Sprache',
    standard: 'Standard',
    green: 'Grün',
    red: 'Rot',
    blue: 'Blau',
    softpink: 'Zartrosa',
    eu: 'EU',
    usa: 'USA',
    english: 'Englisch',
    russian: 'Russisch',
    german: 'Deutsch',
    french: 'Französisch',
    makeNote: 'Notiz erstellen',
    add: '+ Hinzufügen',
    dayNotes: 'Tagesnotizen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    deleteNotes: 'Notizen löschen',
    noNotesYet: 'Noch keine Notizen. Klicke auf "+ Hinzufügen", um die erste Notiz für diesen Tag zu erstellen.',
    noSavedNotes: 'Für diesen Tag gibt es keine gespeicherten Notizen.',
    noNotesToDelete: 'Für diesen Tag gibt es keine Notizen zum Löschen.',
    note: 'Notiz',
    title: 'Titel',
    untitled: 'Ohne Titel',
    months: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    daysEU: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    daysUSA: ['So','Mo','Di','Mi','Do','Fr','Sa']
  },
  fr: {
    back: 'Retour',
    next: 'Suivant',
    settings: 'Paramètres',
    themes: 'Thèmes',
    weekStart: 'Début de semaine',
    language: 'Langue',
    standard: 'Standard',
    green: 'Vert',
    red: 'Rouge',
    blue: 'Bleu',
    softpink: 'Rose tendre',
    eu: 'EU',
    usa: 'USA',
    english: 'Anglais',
    russian: 'Russe',
    german: 'Allemand',
    french: 'Français',
    makeNote: 'Créer une note',
    add: '+ Ajouter',
    dayNotes: 'Notes du jour',
    edit: 'Modifier',
    delete: 'Supprimer',
    deleteNotes: 'Supprimer des notes',
    noNotesYet: 'Aucune note pour le moment. Clique sur "+ Ajouter" pour créer la première note pour ce jour.',
    noSavedNotes: 'Aucune note enregistrée pour ce jour.',
    noNotesToDelete: 'Il n’y a aucune note à supprimer pour ce jour.',
    note: 'Note',
    title: 'Titre',
    untitled: 'Sans titre',
    months: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    daysEU: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
    daysUSA: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
  }
};

Cal.prototype.defaultSettings = function() {
  return {
    theme: 'standard',
    weekStart: 'EU',
    language: 'en'
  };
};

Cal.prototype.t = function(key) {
  return this.translations[this.settings.language][key];
};

Cal.prototype.getMonths = function() {
  return this.translations[this.settings.language].months;
};

Cal.prototype.getDaysOfWeek = function() {
  return this.settings.weekStart === 'USA'
    ? this.translations[this.settings.language].daysUSA
    : this.translations[this.settings.language].daysEU;
};

Cal.prototype.loadSettings = function() {
  try {
    var saved = localStorage.getItem(this.settingsKey);
    return saved ? { ...this.defaultSettings(), ...JSON.parse(saved) } : this.defaultSettings();
  } catch (error) {
    console.error('Failed to load settings:', error);
    return this.defaultSettings();
  }
};

Cal.prototype.saveSettings = function() {
  try {
    localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

Cal.prototype.applySettings = function() {
  document.body.setAttribute('data-theme', this.settings.theme);
  document.documentElement.lang = this.settings.language;
};

Cal.prototype.loadNotes = function() {
  try {
    var saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Failed to load notes from localStorage:', error);
    return {};
  }
};

Cal.prototype.saveNotes = function() {
  try {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  } catch (error) {
    console.error('Failed to save notes to localStorage:', error);
  }
};

Cal.prototype.nextMonth = function() {
  if (this.currMonth === 11) {
    this.currMonth = 0;
    this.currYear++;
  } else {
    this.currMonth++;
  }
  this.hideNotesPanel();
  this.showcurr();
};

Cal.prototype.previousMonth = function() {
  if (this.currMonth === 0) {
    this.currMonth = 11;
    this.currYear--;
  } else {
    this.currMonth--;
  }
  this.hideNotesPanel();
  this.showcurr();
};

Cal.prototype.showcurr = function() {
  this.updateHeaderButtons();
  this.showMonth(this.currYear, this.currMonth);
};

Cal.prototype.updateHeaderButtons = function() {
  getId('btnPrev').textContent = this.t('back');
  getId('btnNext').textContent = this.t('next');
  getId('btnSettings').setAttribute('aria-label', this.t('settings'));
};

Cal.prototype.getDateKey = function(y, m, d) {
  var month = String(m + 1).padStart(2, '0');
  var day = String(d).padStart(2, '0');
  return y + '-' + month + '-' + day;
};

Cal.prototype.getNotesForDate = function(dateKey) {
  if (!this.notes[dateKey]) {
    this.notes[dateKey] = [];
  }
  return this.notes[dateKey];
};

Cal.prototype.getRealNotesForDate = function(dateKey) {
  return this.getNotesForDate(dateKey).filter(function(note) {
    return (note.title || '').trim() !== '' || (note.time || '').trim() !== '';
  });
};

Cal.prototype.hasRealNotes = function(dateKey) {
  return this.getRealNotesForDate(dateKey).length > 0;
};

Cal.prototype.isCustomColor = function(color) {
  return ['red', 'orange', 'yellow', 'green', 'pink'].indexOf(color) === -1;
};

Cal.prototype.getColorStyle = function(color) {
  if (this.isCustomColor(color)) {
    return 'style="background:' + this.escapeHtml(color) + '"';
  }
  return '';
};

Cal.prototype.renderDots = function(dateKey) {
  var notes = this.getRealNotesForDate(dateKey);

  if (!notes.length) {
    return '<div class="note-dots"></div>';
  }

  var dots = notes.map(function(note) {
    if (['red', 'orange', 'yellow', 'green', 'pink'].includes(note.color)) {
      return '<span class="note-dot dot-' + note.color + '"></span>';
    }
    return '<span class="note-dot" style="background:' + note.color + '"></span>';
  }).join('');

  return '<div class="note-dots">' + dots + '</div>';
};

Cal.prototype.renderDayCell = function(dayNumber, className, dateKey) {
  return (
    '<td class="' + className + '" data-date="' + dateKey + '">' +
      '<div class="day-cell">' +
        '<span class="day">' + dayNumber + '</span>' +
        this.renderDots(dateKey) +
      '</div>' +
    '</td>'
  );
};

Cal.prototype.getJsDayShifted = function(jsDay) {
  if (this.settings.weekStart === 'USA') {
    return jsDay;
  }
  return jsDay === 0 ? 6 : jsDay - 1;
};

Cal.prototype.showMonth = function(y, m) {
  var firstDayOfMonth = this.getJsDayShifted(new Date(y, m, 1).getDay());
  var lastDateOfMonth = new Date(y, m + 1, 0).getDate();
  var lastDayOfLastMonth = (m === 0)
    ? new Date(y - 1, 11, 0).getDate()
    : new Date(y, m, 0).getDate();

  var html = '<table>';

  html += '<thead><tr>';
  html += '<td colspan="7">' + this.getMonths()[m] + ' ' + y + '</td>';
  html += '</tr></thead>';

  html += '<tr class="days">';
  var days = this.getDaysOfWeek();
  for (var d = 0; d < days.length; d++) {
    html += '<td>' + days[d] + '</td>';
  }
  html += '</tr>';

  var i = 1;

  do {
    var dow = this.getJsDayShifted(new Date(y, m, i).getDay());

    if (dow === 0) {
      html += '<tr>';
    } else if (i === 1) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    var today = new Date();
    var className = (today.getFullYear() === y && today.getMonth() === m && today.getDate() === i)
      ? 'today'
      : 'normal';

    var dateKey = this.getDateKey(y, m, i);
    html += this.renderDayCell(i, className, dateKey);

    if (dow === 6) {
      html += '</tr>';
    } else if (i === lastDateOfMonth) {
      var nextMonthDay = 1;
      for (var x = dow + 1; x < 7; x++) {
        html += '<td class="not-current">' + nextMonthDay + '</td>';
        nextMonthDay++;
      }
      html += '</tr>';
    }

    i++;
  } while (i <= lastDateOfMonth);

  html += '</table>';

  document.getElementById(this.divId).innerHTML = html;
  this.bindDayClicks();
  this.restoreSelectedDay();
};

Cal.prototype.bindDayClicks = function() {
  var self = this;
  var cells = document.querySelectorAll('#' + this.divId + ' td.normal, #' + this.divId + ' td.today');

  cells.forEach(function(cell) {
    cell.addEventListener('click', function(e) {
      e.stopPropagation();

      var dateKey = this.dataset.date;
      self.selectedDateKey = dateKey;

      document.querySelectorAll('#' + self.divId + ' td.selected').forEach(function(el) {
        el.classList.remove('selected');
      });

      this.classList.add('selected');

      if (self.hasRealNotes(dateKey)) {
        self.openDayNotesView(dateKey);
      } else {
        self.openNotesEditor(dateKey);
      }
    });
  });
};

Cal.prototype.restoreSelectedDay = function() {
  if (!this.selectedDateKey) return;

  var cell = document.querySelector('#' + this.divId + ' td[data-date="' + this.selectedDateKey + '"]');
  if (cell) {
    cell.classList.add('selected');
  }
};

Cal.prototype.openPanel = function() {
  var panel = document.getElementById('notesPanel');
  panel.classList.remove('hidden');
};

Cal.prototype.hideNotesPanel = function() {
  this.selectedDateKey = null;
  this.deleteSelection = [];

  var panel = document.getElementById('notesPanel');
  panel.classList.add('hidden');

  document.querySelectorAll('#' + this.divId + ' td.selected').forEach(function(el) {
    el.classList.remove('selected');
  });
};

Cal.prototype.openSettingsView = function() {
  this.openPanel();
  this.renderSettingsView();
};

Cal.prototype.openDayNotesView = function(dateKey) {
  this.deleteSelection = [];
  this.openPanel();
  this.renderDayNotesView(dateKey);
};

Cal.prototype.openNotesEditor = function(dateKey) {
  this.deleteSelection = [];
  this.openPanel();
  this.renderNotesEditor(dateKey);
};

Cal.prototype.openDeleteView = function(dateKey) {
  this.deleteSelection = [];
  this.openPanel();
  this.renderDeleteView(dateKey);
};

Cal.prototype.formatDateHeading = function(dateKey) {
  var dateObj = new Date(dateKey);
  return this.getMonths()[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();
};

Cal.prototype.renderSettingsView = function() {
  var self = this;
  var content = document.getElementById('notesPanelContent');

  var html = '';
  html += '<div class="notes-title">' + this.t('settings') + '</div>';

  html += '<div class="settings-section">';
  html += '<div class="settings-section-title">' + this.t('themes') + '</div>';
  html += '<div class="settings-options">';
  html += this.renderOptionButton('theme', 'standard', this.t('standard'), this.settings.theme === 'standard');
  html += this.renderOptionButton('theme', 'green', this.t('green'), this.settings.theme === 'green');
  html += this.renderOptionButton('theme', 'red', this.t('red'), this.settings.theme === 'red');
  html += this.renderOptionButton('theme', 'blue', this.t('blue'), this.settings.theme === 'blue');
  html += this.renderOptionButton('theme', 'softpink', this.t('softpink'), this.settings.theme === 'softpink');
  html += '</div>';
  html += '</div>';

  html += '<div class="settings-section">';
  html += '<div class="settings-section-title">' + this.t('weekStart') + '</div>';
  html += '<div class="settings-options">';
  html += this.renderOptionButton('weekStart', 'EU', this.t('eu'), this.settings.weekStart === 'EU');
  html += this.renderOptionButton('weekStart', 'USA', this.t('usa'), this.settings.weekStart === 'USA');
  html += '</div>';
  html += '</div>';

  html += '<div class="settings-section">';
  html += '<div class="settings-section-title">' + this.t('language') + '</div>';
  html += '<div class="settings-options">';
  html += this.renderOptionButton('language', 'en', this.t('english'), this.settings.language === 'en');
  html += this.renderOptionButton('language', 'ru', this.t('russian'), this.settings.language === 'ru');
  html += this.renderOptionButton('language', 'de', this.t('german'), this.settings.language === 'de');
  html += this.renderOptionButton('language', 'fr', this.t('french'), this.settings.language === 'fr');
  html += '</div>';
  html += '</div>';

  content.innerHTML = html;

  document.querySelectorAll('.option-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var type = this.dataset.type;
      var value = this.dataset.value;
      self.settings[type] = value;
      self.saveSettings();
      self.applySettings();
      self.showcurr();
      self.renderSettingsView();
    });
  });
};

Cal.prototype.renderOptionButton = function(type, value, label, isActive) {
  return '<button class="option-btn' + (isActive ? ' active-option' : '') + '" data-type="' + type + '" data-value="' + value + '">' + label + '</button>';
};

Cal.prototype.renderDayNotesView = function(dateKey) {
  var self = this;
  var notes = this.getRealNotesForDate(dateKey);
  var content = document.getElementById('notesPanelContent');

  var html = '';
  html += '<div class="notes-title">' + this.t('dayNotes') + '</div>';
  html += '<div class="notes-subtitle">' + this.formatDateHeading(dateKey) + '</div>';
  html += '<div class="panel-actions">';
  html += '<button class="edit-btn" id="openEditBtn">' + this.t('edit') + '</button>';
  html += '<button class="delete-mode-btn" id="openDeleteBtn">' + this.t('delete') + '</button>';
  html += '</div>';

  if (!notes.length) {
    html += '<div class="empty-text">' + this.t('noSavedNotes') + '</div>';
  } else {
    html += '<div class="note-list">';
    notes.forEach(function(note) {
      html += '<div class="note-view-item">';
      html +=   '<div class="note-view-date">' + self.formatDateHeading(dateKey) + '</div>';
      html +=   '<div class="note-view-title">' + self.escapeHtml(note.title || self.t('untitled')) + '</div>';
      html +=   '<div class="note-view-bottom">';
      html +=     '<div class="note-view-time">' + ((note.time && note.time.trim() !== '') ? self.escapeHtml(note.time) : '--:--') + '</div>';
      html +=     '<div class="note-view-color">';
      html +=       self.renderColorDotForList(note.color, 'note-view-color-dot');
      html +=     '</div>';
      html +=   '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  content.innerHTML = html;

  var editBtn = document.getElementById('openEditBtn');
  if (editBtn) {
    editBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      self.openNotesEditor(dateKey);
    });
  }

  var deleteBtn = document.getElementById('openDeleteBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      self.openDeleteView(dateKey);
    });
  }
};

Cal.prototype.renderNotesEditor = function(dateKey) {
  var self = this;
  var notes = this.getNotesForDate(dateKey);
  var content = document.getElementById('notesPanelContent');

  var html = '';
  html += '<div class="notes-title">' + this.t('makeNote') + '</div>';
  html += '<div class="notes-subtitle">' + this.formatDateHeading(dateKey) + '</div>';
  html += '<div class="panel-actions">';
  html += '<button class="add-btn" id="addNoteBtn">' + this.t('add') + '</button>';

  if (this.hasRealNotes(dateKey)) {
    html += '<button class="back-btn" id="backToViewBtn">' + this.t('back') + '</button>';
  }

  html += '</div>';

  if (!notes.length) {
    html += '<div class="empty-text">' + this.t('noNotesYet') + '</div>';
  } else {
    html += '<div class="note-form-list">';
    notes.forEach(function(note, index) {
      html += '<div class="note-form-item">';
      html +=   '<div class="note-form-top">';
      html +=     '<div class="note-form-label">' + self.t('note') + ' ' + (index + 1) + '</div>';
      html +=   '</div>';
      html +=   '<div class="note-grid">';
      html +=     '<input class="note-input" data-index="' + index + '" type="text" placeholder="' + self.t('title') + '" value="' + self.escapeHtml(note.title) + '">';
      html +=     '<input class="note-time" data-index="' + index + '" type="time" value="' + self.escapeHtml(note.time) + '">';
      html +=     '<div class="note-color-picker">';
      html +=       self.renderColorCircles(note.color, index);
      html +=       '<input class="note-custom-color" data-index="' + index + '" type="color" value="' + self.normalizeColorForPicker(note.color) + '">';
      html +=     '</div>';
      html +=   '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  content.innerHTML = html;

  var addBtn = document.getElementById('addNoteBtn');
  if (addBtn) {
    addBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      self.addEmptyNote(dateKey);
    });
  }

  var backBtn = document.getElementById('backToViewBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      self.openDayNotesView(dateKey);
    });
  }

  this.bindNoteInputs(dateKey);
};

Cal.prototype.normalizeColorForPicker = function(color) {
  var map = {
    red: '#ef4444',
    orange: '#f97316',
    yellow: '#eab308',
    green: '#22c55e',
    pink: '#ec4899'
  };
  return map[color] || color || '#ef4444';
};

Cal.prototype.renderColorCircles = function(selectedColor, index) {
  var colors = ['red', 'orange', 'yellow', 'green', 'pink'];

  return colors.map(function(color) {
    var activeClass = color === selectedColor ? ' active-color' : '';
    return (
      '<button type="button" class="note-color-option' + activeClass + '" ' +
      'data-index="' + index + '" data-color="' + color + '">' +
      '<span class="note-color-dot dot-' + color + '"></span>' +
      '</button>'
    );
  }).join('');
};

Cal.prototype.renderColorDotForList = function(color, className) {
  if (['red', 'orange', 'yellow', 'green', 'pink'].includes(color)) {
    return '<span class="' + className + ' dot-' + color + '"></span>';
  }
  return '<span class="' + className + '" style="background:' + this.escapeHtml(color) + '"></span>';
};

Cal.prototype.bindNoteInputs = function(dateKey) {
  var self = this;
  var notes = this.getNotesForDate(dateKey);

  document.querySelectorAll('.note-input').forEach(function(input) {
    input.addEventListener('input', function(e) {
      e.stopPropagation();
      var index = Number(this.dataset.index);
      notes[index].title = this.value;
      self.saveNotes();
      self.showcurr();
      self.restoreSelectedDay();
    });
  });

  document.querySelectorAll('.note-time').forEach(function(input) {
    input.addEventListener('input', function(e) {
      e.stopPropagation();
      var index = Number(this.dataset.index);
      notes[index].time = this.value;
      self.saveNotes();
      self.showcurr();
      self.restoreSelectedDay();
    });
  });

  document.querySelectorAll('.note-color-option').forEach(function(option) {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      var index = Number(this.dataset.index);
      var color = this.dataset.color;
      notes[index].color = color;
      self.saveNotes();
      self.showcurr();
      self.renderNotesEditor(dateKey);
    });
  });

  document.querySelectorAll('.note-custom-color').forEach(function(input) {
    input.addEventListener('input', function(e) {
      e.stopPropagation();
      var index = Number(this.dataset.index);
      notes[index].color = this.value;
      self.saveNotes();
      self.showcurr();
      self.renderNotesEditor(dateKey);
    });
  });
};

Cal.prototype.addEmptyNote = function(dateKey) {
  var notes = this.getNotesForDate(dateKey);

  notes.push({
    id: Date.now() + Math.random().toString(16).slice(2),
    title: '',
    time: '',
    color: 'red'
  });

  this.saveNotes();
  this.showcurr();
  this.openNotesEditor(dateKey);
};

Cal.prototype.renderDeleteView = function(dateKey) {
  var self = this;
  var notes = this.getRealNotesForDate(dateKey);
  var content = document.getElementById('notesPanelContent');

  var html = '';
  html += '<div class="panel-actions">';
  html += '<button class="back-btn" id="backToViewFromDeleteBtn">' + this.t('back') + '</button>';
  html += '</div>';
  html += '<div class="notes-title">' + this.t('deleteNotes') + '</div>';
  html += '<div class="notes-subtitle">' + this.formatDateHeading(dateKey) + '</div>';

  if (!notes.length) {
    html += '<div class="empty-text">' + this.t('noNotesToDelete') + '</div>';
  } else {
    html += '<div class="delete-list">';
    notes.forEach(function(note) {
      var selectedClass = self.deleteSelection.includes(note.id) ? ' selected-delete' : '';

      html += '<div class="delete-item' + selectedClass + '" data-note-id="' + note.id + '">';
      html +=   '<div class="delete-item-date">' + self.formatDateHeading(dateKey) + '</div>';
      html +=   '<div class="delete-item-title">' + self.escapeHtml(note.title || self.t('untitled')) + '</div>';
      html +=   '<div class="delete-item-bottom">';
      html +=     '<div class="delete-item-time">' + ((note.time && note.time.trim() !== '') ? self.escapeHtml(note.time) : '--:--') + '</div>';
      html +=     '<div class="delete-item-color">';
      html +=       self.renderColorDotForList(note.color, 'delete-color-dot');
      html +=     '</div>';
      html +=   '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  var disabledAttr = this.deleteSelection.length ? '' : ' disabled';
  html += '<button class="delete-btn" id="confirmDeleteBtn"' + disabledAttr + '>' + this.t('delete') + '</button>';

  content.innerHTML = html;

  var backBtn = document.getElementById('backToViewFromDeleteBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      self.deleteSelection = [];
      self.openDayNotesView(dateKey);
    });
  }

  document.querySelectorAll('.delete-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var noteId = this.dataset.noteId;

      if (self.deleteSelection.includes(noteId)) {
        self.deleteSelection = self.deleteSelection.filter(function(id) {
          return id !== noteId;
        });
      } else {
        self.deleteSelection.push(noteId);
      }

      self.renderDeleteView(dateKey);
    });
  });

  var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!self.deleteSelection.length) return;

      self.notes[dateKey] = self.getNotesForDate(dateKey).filter(function(note) {
        return !self.deleteSelection.includes(note.id);
      });

      if (!self.notes[dateKey].length) {
        delete self.notes[dateKey];
      }

      self.deleteSelection = [];
      self.saveNotes();
      self.showcurr();

      if (self.hasRealNotes(dateKey)) {
        self.openDayNotesView(dateKey);
      } else {
        self.openNotesEditor(dateKey);
      }
    });
  }
};

Cal.prototype.escapeHtml = function(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

window.onload = function() {
  var c = new Cal('divCal');
  c.showcurr();

  getId('btnNext').onclick = function(e) {
    e.stopPropagation();
    c.nextMonth();
  };

  getId('btnPrev').onclick = function(e) {
    e.stopPropagation();
    c.previousMonth();
  };

  getId('btnSettings').onclick = function(e) {
    e.stopPropagation();
    c.openSettingsView();
  };

  document.addEventListener('click', function(e) {
    var clickedInsideCalendar = e.target.closest('.calendar-wrapper');
    var clickedInsidePanel = e.target.closest('#notesPanel');

    if (!clickedInsideCalendar && !clickedInsidePanel) {
      c.hideNotesPanel();
    }
  });

  document.getElementById('notesPanel').addEventListener('click', function(e) {
    e.stopPropagation();
  });
};

function getId(id) {
  return document.getElementById(id);
}