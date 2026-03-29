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
    mode: 'Mode',
    dayMode: 'Day',
    nightMode: 'Night',
    themes: 'Themes',
    weekStart: 'Start of Week',
    language: 'Language',
    themeStandard: 'Aurora Violet',
    themeForest: 'Forest Dew',
    themeCherry: 'Cherry Ember',
    themeOcean: 'Coastal Azure',
    themeSakura: 'Sakura Blush',
    themeHoney: 'Honey Sunrise',
    themeCustom: 'Your Palette',
    customPaletteHint: 'Bright presets — tap one or fine-tune below.',
    customPickExact: 'Exact color',
    pickCustomColor: 'Custom color',
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
    daysUSA: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    viewRange: 'View',
    view1Day: '1 day',
    view3Days: '3 days',
    view7Days: '7 days',
    view1Month: '1 month',
    ariaNavMonthPrev: 'Previous month',
    ariaNavMonthNext: 'Next month',
    ariaNavDayPrev: 'Previous day',
    ariaNavDayNext: 'Next day',
    ariaNavWeekPrev: 'Previous week',
    ariaNavWeekNext: 'Next week',
    ariaNavRangePrev: 'Previous days',
    ariaNavRangeNext: 'Next days'
  },
  ru: {
    back: 'Назад',
    next: 'Далее',
    settings: 'Настройки',
    mode: 'Режим',
    dayMode: 'Дневной',
    nightMode: 'Ночной',
    themes: 'Темы',
    weekStart: 'Начало недели',
    language: 'Язык',
    themeStandard: 'Лиловый рассвет',
    themeForest: 'Роса в лесу',
    themeCherry: 'Вишнёвый закат',
    themeOcean: 'Морская лазурь',
    themeSakura: 'Цвет сакуры',
    themeHoney: 'Медовый рассвет',
    themeCustom: 'Свой цвет',
    customPaletteHint: 'Яркие пресеты — нажмите или выберите ниже.',
    customPickExact: 'Точный цвет',
    pickCustomColor: 'Свой цвет',
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
    daysUSA: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    viewRange: 'Показ',
    view1Day: '1 день',
    view3Days: '3 дня',
    view7Days: '7 дней',
    view1Month: '1 месяц',
    ariaNavMonthPrev: 'Предыдущий месяц',
    ariaNavMonthNext: 'Следующий месяц',
    ariaNavDayPrev: 'Предыдущий день',
    ariaNavDayNext: 'Следующий день',
    ariaNavWeekPrev: 'Предыдущая неделя',
    ariaNavWeekNext: 'Следующая неделя',
    ariaNavRangePrev: 'Предыдущие дни',
    ariaNavRangeNext: 'Следующие дни'
  },
  de: {
    back: 'Zurück',
    next: 'Weiter',
    settings: 'Einstellungen',
    mode: 'Modus',
    dayMode: 'Tag',
    nightMode: 'Nacht',
    themes: 'Themen',
    weekStart: 'Wochenbeginn',
    language: 'Sprache',
    themeStandard: 'Morgenviolett',
    themeForest: 'Waldduft',
    themeCherry: 'Kirschglut',
    themeOcean: 'Meeresblau',
    themeSakura: 'Kirschblüte',
    themeHoney: 'Honiggold',
    themeCustom: 'Eigene Farbe',
    customPaletteHint: 'Leuchtende Farben — antippen oder unten wählen.',
    customPickExact: 'Genau wählen',
    pickCustomColor: 'Eigene Farbe',
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
    daysUSA: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    viewRange: 'Ansicht',
    view1Day: '1 Tag',
    view3Days: '3 Tage',
    view7Days: '7 Tage',
    view1Month: '1 Monat',
    ariaNavMonthPrev: 'Vorheriger Monat',
    ariaNavMonthNext: 'Nächster Monat',
    ariaNavDayPrev: 'Vorheriger Tag',
    ariaNavDayNext: 'Nächster Tag',
    ariaNavWeekPrev: 'Vorherige Woche',
    ariaNavWeekNext: 'Nächste Woche',
    ariaNavRangePrev: 'Vorherige Tage',
    ariaNavRangeNext: 'Nächste Tage'
  },
  fr: {
    back: 'Retour',
    next: 'Suivant',
    settings: 'Paramètres',
    mode: 'Mode',
    dayMode: 'Jour',
    nightMode: 'Nuit',
    themes: 'Thèmes',
    weekStart: 'Début de semaine',
    language: 'Langue',
    themeStandard: 'Aube violette',
    themeForest: 'Rosée des bois',
    themeCherry: 'Braise cerise',
    themeOcean: 'Azur côtier',
    themeSakura: 'Pétale de sakura',
    themeHoney: 'Miel doré',
    themeCustom: 'Ta palette',
    customPaletteHint: 'Couleurs vives — touchez ou affinez ci-dessous.',
    customPickExact: 'Couleur exacte',
    pickCustomColor: 'Couleur perso',
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
    daysUSA: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    viewRange: 'Affichage',
    view1Day: '1 jour',
    view3Days: '3 jours',
    view7Days: '7 jours',
    view1Month: '1 mois',
    ariaNavMonthPrev: 'Mois précédent',
    ariaNavMonthNext: 'Mois suivant',
    ariaNavDayPrev: 'Jour précédent',
    ariaNavDayNext: 'Jour suivant',
    ariaNavWeekPrev: 'Semaine précédente',
    ariaNavWeekNext: 'Semaine suivante',
    ariaNavRangePrev: 'Jours précédents',
    ariaNavRangeNext: 'Jours suivants'
  }
};

Cal.prototype.defaultSettings = function() {
  return {
    theme: 'standard',
    customColor: '#7c3aed',
    mode: 'light',
    weekStart: 'EU',
    language: 'en',
    viewSpan: 'month',
    rangeAnchor: null
  };
};

Cal.prototype.CUSTOM_THEME_CSS_VARS = [
  '--bg-start', '--bg-end', '--surface', '--surface-soft', '--heading', '--accent',
  '--accent-soft', '--accent-soft-2', '--accent-hover', '--accent-strong', '--outline',
  '--today-start', '--today-end', '--selected-bg', '--selected-shadow', '--input-border', '--muted-cell'
];

Cal.prototype.BRIGHT_CUSTOM_SWATCHES = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
];

Cal.prototype.hexToRgb = function(hex) {
  var h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) {
    h = h.split('').map(function(c) { return c + c; }).join('');
  }
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) {
    return { r: 124, g: 58, b: 237 };
  }
  var n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

Cal.prototype.rgbToHex = function(r, g, b) {
  return '#' + [r, g, b].map(function(x) {
    var v = Math.max(0, Math.min(255, Math.round(x)));
    return v.toString(16).padStart(2, '0');
  }).join('');
};

Cal.prototype.blendHex = function(hexA, hexB, t) {
  var a = this.hexToRgb(hexA);
  var b = this.hexToRgb(hexB);
  return this.rgbToHex(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t
  );
};

Cal.prototype.rgbaFromHex = function(hex, alpha) {
  var o = this.hexToRgb(hex);
  return 'rgba(' + o.r + ',' + o.g + ',' + o.b + ',' + alpha + ')';
};

Cal.prototype.normalizeCustomHex = function(hex) {
  var h = String(hex || '').trim();
  if (!h.startsWith('#')) h = '#' + h;
  var rgb = this.hexToRgb(h);
  return this.rgbToHex(rgb.r, rgb.g, rgb.b);
};

Cal.prototype.buildCustomThemeVariables = function(hex, isDark) {
  var base = this.normalizeCustomHex(hex);
  if (isDark) {
    var acc = this.blendHex(base, '#ffffff', 0.22);
    var accLight = this.blendHex(base, '#ffffff', 0.55);
    return {
      '--bg-start': this.blendHex(base, '#0f172a', 0.86),
      '--bg-end': this.blendHex(base, '#020617', 0.9),
      '--surface': this.rgbaFromHex(this.blendHex(base, '#1e293b', 0.5), 0.82),
      '--surface-soft': this.rgbaFromHex(this.blendHex(base, '#1e293b', 0.55), 0.62),
      '--heading': accLight,
      '--accent': this.blendHex(base, '#ffffff', 0.12),
      '--accent-soft': this.rgbaFromHex(acc, 0.2),
      '--accent-soft-2': this.rgbaFromHex(acc, 0.14),
      '--accent-hover': this.rgbaFromHex(acc, 0.32),
      '--accent-strong': this.blendHex(base, '#f1f5f9', 0.72),
      '--outline': this.rgbaFromHex(acc, 0.38),
      '--today-start': this.blendHex(base, '#ffffff', 0.28),
      '--today-end': this.blendHex(base, '#ffffff', 0.08),
      '--selected-bg': this.rgbaFromHex(acc, 0.16),
      '--selected-shadow': this.rgbaFromHex(acc, 0.28),
      '--input-border': this.rgbaFromHex(accLight, 0.4),
      '--muted-cell': this.rgbaFromHex(accLight, 0.55)
    };
  }
  return {
    '--bg-start': this.blendHex(base, '#ffffff', 0.91),
    '--bg-end': this.blendHex(base, '#fffef8', 0.87),
    '--surface': this.blendHex(base, '#ffffff', 0.76),
    '--surface-soft': this.blendHex(base, '#ffffff', 0.84),
    '--heading': this.blendHex(base, '#1a1a1a', 0.62),
    '--accent': base,
    '--accent-soft': this.blendHex(base, '#ffffff', 0.62),
    '--accent-soft-2': this.blendHex(base, '#ffffff', 0.72),
    '--accent-hover': this.blendHex(base, '#ffffff', 0.42),
    '--accent-strong': this.blendHex(base, '#0f172a', 0.48),
    '--outline': this.rgbaFromHex(base, 0.22),
    '--today-start': this.blendHex(base, '#ffffff', 0.28),
    '--today-end': this.blendHex(base, '#000000', 0.12),
    '--selected-bg': this.blendHex(base, '#ffffff', 0.78),
    '--selected-shadow': this.rgbaFromHex(base, 0.2),
    '--input-border': this.blendHex(base, '#ffffff', 0.48),
    '--muted-cell': this.rgbaFromHex(base, 0.42)
  };
};

Cal.prototype.clearCustomThemeInline = function() {
  var self = this;
  this.CUSTOM_THEME_CSS_VARS.forEach(function(key) {
    document.body.style.removeProperty(key);
  });
};

Cal.prototype.applyCustomThemeInline = function() {
  this.clearCustomThemeInline();
  if (this.settings.theme !== 'custom') return;
  var hex = this.normalizeCustomHex(this.settings.customColor || '#7c3aed');
  var vars = this.buildCustomThemeVariables(hex, this.settings.mode === 'dark');
  var k;
  for (k in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, k)) {
      document.body.style.setProperty(k, vars[k]);
    }
  }
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
  document.body.setAttribute('data-mode', this.settings.mode === 'dark' ? 'dark' : 'light');
  document.documentElement.lang = this.settings.language;
  this.clearCustomThemeInline();
  if (this.settings.theme === 'custom') {
    this.applyCustomThemeInline();
  }
  this.applyViewLayout();
};

Cal.prototype.applyViewLayout = function() {
  var shell = document.querySelector('.app-shell');
  if (!shell) return;
  if ((this.settings.viewSpan || 'month') === 'month') {
    shell.classList.remove('layout-compact');
  } else {
    shell.classList.add('layout-compact');
  }
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

Cal.prototype.addDays = function(y, m, d, delta) {
  var dt = new Date(y, m, d + delta);
  return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() };
};

Cal.prototype.getWeekStart = function(y, m, d) {
  var date = new Date(y, m, d);
  var jsDow = date.getDay();
  var delta;
  if (this.settings.weekStart === 'USA') {
    delta = jsDow;
  } else {
    delta = jsDow === 0 ? 6 : jsDow - 1;
  }
  date.setDate(date.getDate() - delta);
  return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
};

Cal.prototype.getWeekdayLabelForDate = function(y, m, d) {
  var jsDay = new Date(y, m, d).getDay();
  var lang = this.translations[this.settings.language];
  if (this.settings.weekStart === 'USA') {
    return lang.daysUSA[jsDay];
  }
  var euIdx = jsDay === 0 ? 6 : jsDay - 1;
  return lang.daysEU[euIdx];
};

Cal.prototype.formatRangeTitle = function(start, end) {
  var months = this.getMonths();
  if (start.y === end.y && start.m === end.m) {
    return months[start.m] + ' ' + start.d + ' – ' + end.d + ', ' + start.y;
  }
  if (start.y === end.y) {
    return months[start.m] + ' ' + start.d + ' – ' + months[end.m] + ' ' + end.d + ', ' + start.y;
  }
  return months[start.m] + ' ' + start.d + ', ' + start.y + ' – ' + months[end.m] + ' ' + end.d + ', ' + end.y;
};

Cal.prototype.ensureRangeAnchor = function() {
  var span = this.settings.viewSpan || 'month';
  if (span === 'month') return;
  var changed = false;
  var t = new Date();
  if (!this.settings.rangeAnchor || typeof this.settings.rangeAnchor.y !== 'number') {
    this.settings.rangeAnchor = { y: t.getFullYear(), m: t.getMonth(), d: t.getDate() };
    changed = true;
  }
  if (span === '7') {
    var ws = this.getWeekStart(
      this.settings.rangeAnchor.y,
      this.settings.rangeAnchor.m,
      this.settings.rangeAnchor.d
    );
    if (
      ws.y !== this.settings.rangeAnchor.y ||
      ws.m !== this.settings.rangeAnchor.m ||
      ws.d !== this.settings.rangeAnchor.d
    ) {
      this.settings.rangeAnchor = ws;
      changed = true;
    }
  }
  if (changed) {
    this.saveSettings();
  }
};

Cal.prototype.navigateCalendar = function(direction) {
  this.hideNotesPanel();
  var span = this.settings.viewSpan || 'month';
  if (span === 'month') {
    if (direction > 0) {
      if (this.currMonth === 11) {
        this.currMonth = 0;
        this.currYear++;
      } else {
        this.currMonth++;
      }
    } else {
      if (this.currMonth === 0) {
        this.currMonth = 11;
        this.currYear--;
      } else {
        this.currMonth--;
      }
    }
  } else {
    this.ensureRangeAnchor();
    var a = this.settings.rangeAnchor;
    var step = span === '7' ? 7 * direction : direction;
    this.settings.rangeAnchor = this.addDays(a.y, a.m, a.d, step);
    this.saveSettings();
  }
  this.showcurr();
};

Cal.prototype.nextMonth = function() {
  this.navigateCalendar(1);
};

Cal.prototype.previousMonth = function() {
  this.navigateCalendar(-1);
};

Cal.prototype.showcurr = function() {
  if ((this.settings.viewSpan || 'month') !== 'month') {
    this.ensureRangeAnchor();
  }
  this.updateHeaderUI();
  var span = this.settings.viewSpan || 'month';
  if (span === 'month') {
    this.showMonth(this.currYear, this.currMonth);
  } else {
    this.showDayRange(span);
  }
  this.applyViewLayout();
};

Cal.prototype.getViewSpanOptions = function() {
  return [
    { value: '1', key: 'view1Day' },
    { value: '3', key: 'view3Days' },
    { value: '7', key: 'view7Days' },
    { value: 'month', key: 'view1Month' }
  ];
};

Cal.prototype.syncViewSpanThumb = function() {
  var track = document.getElementById('viewSpanTrack');
  var thumb = document.getElementById('viewSpanThumb');
  if (!track || !thumb) return;
  var span = this.settings.viewSpan || 'month';
  var btn = track.querySelector('.view-span-btn[data-value="' + span + '"]');
  if (!btn) {
    btn = track.querySelector('.view-span-btn[data-value="month"]');
  }
  if (!btn) return;
  var tr = track.getBoundingClientRect();
  var br = btn.getBoundingClientRect();
  thumb.style.width = Math.round(br.width) + 'px';
  thumb.style.left = Math.round(br.left - tr.left) + 'px';
  thumb.style.top = Math.round(br.top - tr.top) + 'px';
  thumb.style.height = Math.round(br.height) + 'px';

  track.querySelectorAll('.view-span-btn').forEach(function(b) {
    var on = b.getAttribute('data-value') === span;
    b.classList.toggle('is-selected', on);
    b.setAttribute('aria-checked', on ? 'true' : 'false');
  });
};

Cal.prototype.updateHeaderUI = function() {
  var self = this;
  getId('btnPrev').textContent = this.t('back');
  getId('btnNext').textContent = this.t('next');
  getId('btnSettings').setAttribute('aria-label', this.t('settings'));

  var span = this.settings.viewSpan || 'month';
  if (span === 'month') {
    getId('btnPrev').setAttribute('aria-label', this.t('ariaNavMonthPrev'));
    getId('btnNext').setAttribute('aria-label', this.t('ariaNavMonthNext'));
  } else if (span === '1') {
    getId('btnPrev').setAttribute('aria-label', this.t('ariaNavDayPrev'));
    getId('btnNext').setAttribute('aria-label', this.t('ariaNavDayNext'));
  } else if (span === '7') {
    getId('btnPrev').setAttribute('aria-label', this.t('ariaNavWeekPrev'));
    getId('btnNext').setAttribute('aria-label', this.t('ariaNavWeekNext'));
  } else {
    getId('btnPrev').setAttribute('aria-label', this.t('ariaNavRangePrev'));
    getId('btnNext').setAttribute('aria-label', this.t('ariaNavRangeNext'));
  }

  var labelEl = document.getElementById('viewSpanLabel');
  if (labelEl) {
    labelEl.textContent = this.t('viewRange');
  }

  var track = document.getElementById('viewSpanTrack');
  if (track) {
    this.getViewSpanOptions().forEach(function(o) {
      var b = track.querySelector('.view-span-btn[data-value="' + o.value + '"]');
      if (b) {
        b.textContent = self.t(o.key);
      }
    });
  }

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      self.syncViewSpanThumb();
    });
  });
};

Cal.prototype.onViewSpanChange = function(value) {
  var prev = this.settings.viewSpan || 'month';
  var prevAnchor = this.settings.rangeAnchor;
  this.settings.viewSpan = value;

  if (value === 'month') {
    var t = this.settings.rangeAnchor;
    if (t && typeof t.y === 'number') {
      this.currYear = t.y;
      this.currMonth = t.m;
    }
  } else if (value === '3') {
    var n3 = new Date();
    this.settings.rangeAnchor = { y: n3.getFullYear(), m: n3.getMonth(), d: n3.getDate() };
  } else if (value === '1') {
    if (prev === 'month' && this.selectedDateKey) {
      var p1 = this.selectedDateKey.split('-');
      this.settings.rangeAnchor = {
        y: Number(p1[0]),
        m: Number(p1[1]) - 1,
        d: Number(p1[2])
      };
    } else if (prevAnchor && typeof prevAnchor.y === 'number' && prev !== 'month') {
      this.settings.rangeAnchor = { y: prevAnchor.y, m: prevAnchor.m, d: prevAnchor.d };
    } else {
      var n1 = new Date();
      this.settings.rangeAnchor = { y: n1.getFullYear(), m: n1.getMonth(), d: n1.getDate() };
    }
  } else if (value === '7') {
    if (prev === 'month' && this.selectedDateKey) {
      var p7 = this.selectedDateKey.split('-');
      this.settings.rangeAnchor = {
        y: Number(p7[0]),
        m: Number(p7[1]) - 1,
        d: Number(p7[2])
      };
    } else if (prevAnchor && typeof prevAnchor.y === 'number' && prev !== 'month') {
      this.settings.rangeAnchor = { y: prevAnchor.y, m: prevAnchor.m, d: prevAnchor.d };
    } else {
      var n7 = new Date();
      this.settings.rangeAnchor = { y: n7.getFullYear(), m: n7.getMonth(), d: n7.getDate() };
    }
    this.settings.rangeAnchor = this.getWeekStart(
      this.settings.rangeAnchor.y,
      this.settings.rangeAnchor.m,
      this.settings.rangeAnchor.d
    );
  }

  this.saveSettings();
  this.hideNotesPanel();
  this.showcurr();
};

Cal.prototype.showDayRange = function(span) {
  var n = Number(span);
  var a = this.settings.rangeAnchor;
  var days = [];
  var i;
  for (i = 0; i < n; i++) {
    days.push(this.addDays(a.y, a.m, a.d, i));
  }

  var title = this.formatRangeTitle(days[0], days[days.length - 1]);
  var html = '<table class="calendar-range cols-' + n + '">';

  html += '<thead><tr>';
  html += '<td colspan="' + n + '">' + title + '</td>';
  html += '</tr></thead>';

  html += '<tr class="days">';
  for (i = 0; i < days.length; i++) {
    var di = days[i];
    html += '<td>' + this.getWeekdayLabelForDate(di.y, di.m, di.d) + '</td>';
  }
  html += '</tr>';

  html += '<tr>';
  var today = new Date();
  for (i = 0; i < days.length; i++) {
    var dk = days[i];
    var isToday = today.getFullYear() === dk.y && today.getMonth() === dk.m && today.getDate() === dk.d;
    var className = isToday ? 'today' : 'normal';
    var dateKey = this.getDateKey(dk.y, dk.m, dk.d);
    html += this.renderDayCell(dk.d, className, dateKey);
  }
  html += '</tr>';

  html += '</table>';

  document.getElementById(this.divId).innerHTML = html;
  this.bindDayClicks();
  this.restoreSelectedDay();
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
  return ['red', 'orange', 'yellow', 'green'].indexOf(color) === -1;
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
        el.classList.remove('selected', 'selected-day-glow');
      });

      this.classList.add('selected');

      if (!this.classList.contains('today')) {
        this.classList.remove('selected-day-glow');
        void this.offsetWidth;
        this.classList.add('selected-day-glow');
      }

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
    el.classList.remove('selected', 'selected-day-glow');
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
  html += '<div class="settings-section-title">' + this.t('mode') + '</div>';
  html += '<div class="settings-options settings-options-mode">';
  html += this.renderOptionButton('mode', 'light', '<span class="mode-icon" aria-hidden="true">☀️</span><span class="mode-text">' + this.t('dayMode') + '</span>', this.settings.mode !== 'dark', 'mode-btn');
  html += this.renderOptionButton('mode', 'dark', '<span class="mode-icon" aria-hidden="true">🌙</span><span class="mode-text">' + this.t('nightMode') + '</span>', this.settings.mode === 'dark', 'mode-btn');
  html += '</div>';
  html += '</div>';

  html += '<div class="settings-section">';
  html += '<div class="settings-section-title">' + this.t('themes') + '</div>';
  html += '<div class="settings-options settings-options-themes">';
  html += this.renderOptionButton('theme', 'standard', this.t('themeStandard'), this.settings.theme === 'standard', '', 'standard');
  html += this.renderOptionButton('theme', 'green', this.t('themeForest'), this.settings.theme === 'green', '', 'green');
  html += this.renderOptionButton('theme', 'red', this.t('themeCherry'), this.settings.theme === 'red', '', 'red');
  html += this.renderOptionButton('theme', 'blue', this.t('themeOcean'), this.settings.theme === 'blue', '', 'blue');
  html += this.renderOptionButton('theme', 'softpink', this.t('themeSakura'), this.settings.theme === 'softpink', '', 'softpink');
  html += this.renderOptionButton('theme', 'yellow', this.t('themeHoney'), this.settings.theme === 'yellow', '', 'yellow');
  html += this.renderOptionButton('theme', 'custom', this.t('themeCustom'), this.settings.theme === 'custom', '', 'custom');
  html += '</div>';
  html += '<div class="custom-theme-panel' + (this.settings.theme === 'custom' ? '' : ' hidden') + '" id="customThemePanel">';
  html += '<p class="custom-palette-hint">' + this.escapeHtml(this.t('customPaletteHint')) + '</p>';
  html += '<div class="custom-palette-grid" id="customPaletteGrid"></div>';
  html += '<label class="custom-palette-native">';
  html += '<span>' + this.escapeHtml(this.t('customPickExact')) + '</span>';
  html += '<input type="color" id="customThemeColorInput" value="' + this.escapeHtml(this.normalizeCustomHex(this.settings.customColor || '#7c3aed')) + '">';
  html += '</label>';
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

  var grid = document.getElementById('customPaletteGrid');
  if (grid) {
    grid.innerHTML = self.BRIGHT_CUSTOM_SWATCHES.map(function(h) {
      return (
        '<button type="button" class="custom-palette-swatch" data-hex="' + self.escapeHtml(h) + '" ' +
        'style="--swatch:' + self.escapeHtml(h) + '" title="' + self.escapeHtml(h) + '"></button>'
      );
    }).join('');
  }

  document.querySelectorAll('.custom-palette-swatch').forEach(function(sw) {
    sw.addEventListener('click', function(e) {
      e.stopPropagation();
      var hx = this.getAttribute('data-hex');
      self.settings.theme = 'custom';
      self.settings.customColor = hx;
      self.saveSettings();
      self.applySettings();
      self.showcurr();
      self.renderSettingsView();
      var inp = document.getElementById('customThemeColorInput');
      if (inp) inp.value = self.normalizeCustomHex(hx);
    });
  });

  var colorInp = document.getElementById('customThemeColorInput');
  if (colorInp) {
    colorInp.addEventListener('input', function(e) {
      e.stopPropagation();
      self.settings.theme = 'custom';
      self.settings.customColor = this.value;
      self.saveSettings();
      self.applySettings();
      self.showcurr();
    });
  }

  document.querySelectorAll('.option-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var type = this.dataset.type;
      var value = this.dataset.value;
      self.settings[type] = value;
      if (type === 'theme' && value === 'custom' && !self.settings.customColor) {
        self.settings.customColor = '#8b5cf6';
      }
      if (type === 'weekStart' && self.settings.viewSpan === '7' && self.settings.rangeAnchor) {
        self.settings.rangeAnchor = self.getWeekStart(
          self.settings.rangeAnchor.y,
          self.settings.rangeAnchor.m,
          self.settings.rangeAnchor.d
        );
      }
      self.saveSettings();
      self.applySettings();
      self.showcurr();
      self.renderSettingsView();
    });
  });
};

Cal.prototype.renderOptionButton = function(type, value, label, isActive, extraClass, themeSwatch) {
  var extra = extraClass ? (' ' + extraClass) : '';
  var swCls = themeSwatch ? ' theme-swatch-btn' : '';
  var swData = themeSwatch ? ' data-theme-swatch="' + themeSwatch + '"' : '';
  var inner = themeSwatch
    ? '<span class="theme-swatch-label">' + this.escapeHtml(String(label)) + '</span>'
    : label;
  return (
    '<button type="button" class="option-btn' + extra + swCls + (isActive ? ' active-option' : '') + '" ' +
    'data-type="' + type + '" data-value="' + value + '"' + swData + '>' + inner + '</button>'
  );
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
      html +=       self.renderNotePaletteInput(note.color, index);
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
  var colors = ['red', 'orange', 'yellow', 'green'];

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

Cal.prototype.renderNotePaletteInput = function(noteColor, index) {
  var isPaletteActive = this.isCustomColor(noteColor) || noteColor === 'pink';
  var val = this.normalizeColorForPicker(noteColor);
  var active = isPaletteActive ? ' note-palette-label--active' : '';
  return (
    '<label class="note-palette-label' + active + '">' +
    '<input type="color" class="note-palette-input" data-index="' + index + '" value="' +
    this.escapeHtml(val) + '" title="' + this.escapeHtml(this.t('pickCustomColor')) + '" aria-label="' +
    this.escapeHtml(this.t('pickCustomColor')) + '">' +
    '<span class="note-palette-face" aria-hidden="true"></span>' +
    '</label>'
  );
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

  document.querySelectorAll('.note-palette-input').forEach(function(input) {
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

  var viewTrack = document.getElementById('viewSpanTrack');
  if (viewTrack) {
    viewTrack.querySelectorAll('.view-span-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        c.onViewSpanChange(this.getAttribute('data-value'));
      });
    });
  }

  window.addEventListener('resize', function() {
    c.syncViewSpanThumb();
  });

  if (typeof ResizeObserver !== 'undefined' && viewTrack) {
    var viewSpanRo = new ResizeObserver(function() {
      c.syncViewSpanThumb();
    });
    viewSpanRo.observe(viewTrack);
  }

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