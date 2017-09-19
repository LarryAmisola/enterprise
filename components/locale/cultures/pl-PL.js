(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define('cultures/pl-PL', ['jquery'], factory);
    factory();
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function () {

  if (!Locale) {
    return;
  }

  //Get Latest from http://www.unicode.org/Public/cldr/25/
  Locale.addCulture('pl-PL', {
    //layout/language
    language: 'pl',
    englishName: 'Polish (Poland)',
    nativeName: 'polski (Polska)',
    //layout/orientation/@characters
    direction: 'left-to-right',
    //ca-gregorian
    calendars: [{
      name: 'gregorian',
      //ca-gregorian/main/dates/calendars/gregorian/dateFormats/
      dateFormat: {'separator': '.', //Infered
                   'timeSeparator': ':',
                   'short': 'dd.MM.yyyy', //use four digit year
                   'medium': 'd MMM yyyy',
                   'long': 'd MMMM yyyy',
                   'full': 'EEEE, d MMMM yyyy',
                   'month': 'd MMMM',
                   'year': 'MMMM yyyy',
                   'timestamp': 'HH:mm:ss',
                   'datetime': 'dd.MM.yyyy HH:mm'}, //Infered short + short gregorian/dateTimeFormats
      //ca-gregorian/main/dates/calendars/gregorian/days/format/short or abbreviated (2 digit)
      days: {
         wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
         abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
         narrow: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S']
      },
      //ca-gregorian/main/dates/calendars/gregorian/months/format/wide
      months: {
        wide: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru']
      },
      //ca-gregorian/main/dates/calendars/gregorian/timeFormats/short
      timeFormat: 'HH:mm',
      //ca-gregorian/main/dates/calendars/gregorian/dayPeriods/wide
      dayPeriods: ['AM', 'PM']
    }],
    //numbers/currencyFormats-numberSystem-latn/standard (Replace Sign http://www.currencysymbols.in ?)
    currencySign: 'zł', //(Replace Sign http://www.currencysymbols.in ?)
    currencyFormat: '#,##0.00 ¤',
    //numbers/symbols-numberSystem-latn
    numbers: {
      percentSign: '%',
      percentFormat: '#,##0 %',
      minusSign: '-',
      decimal: ',',
      group: ' '
    },
    //Resx - Approved By Translation Team
    messages: {
      'AboutText': {id: 'AboutText', value: 'Copyright &copy; {0} Infor. Wszelkie prawa zastrzeżone. Wymienione tu znaki słowne i graficzne są znakami towarowymi i/lub zastrzeżonymi znakami towarowymi firmy Infor i/lub jej podmiotów stowarzyszonych i przedstawicielstw. Wszelkie prawa zastrzeżone. Wszystkie pozostałe znaki towarowe są własnością odpowiednich podmiotów'},
      'Actions': {id: 'Actions', value: 'Akcje', comment: 'Tooltip text for the action button with additional in context actions'},
      'Add': {id: 'Add', value: 'Dodaj', comment: 'Add'},
      'AddNewTab': {id: 'AddNewTab', value: 'Dodaj nową kartę', comment: 'Attached to a button that adds new tabs'},
      'AdvancedFilter': {id: 'AdvancedFilter', value: 'Utwórz filtr zaawansowany', comment: 'In a data grid active an advanced filtering feature'},
      'Alert': {id: 'Alert', value: 'Alert', comment: 'Alert'},
      'All': {id: 'All', value: 'Wszystkie', comment: 'All items in the context of a filter'},
      'AllResults': {id: 'AllResults', value: 'Wszystkie wyniki dla', comment: 'Search Results Text'},
      'AligntoBottom': {id: 'AligntoBottom', value: 'Wyrównaj do dołu', comment: 'Align to Bottom tooltip'},
      'AlignCenterHorizontally': {id: 'AlignCenterHorizontally', value: 'Wyrównaj do środka w poziomie', comment: 'Align Center Horizontally tooltip'},
      'Amber': {id: 'Amber', value: 'Bursztynowy', comment: 'Color in our color pallette'},
      'Amethyst': {id: 'Amethyst', value: 'Fioletowy', comment: 'Color in our color pallette'},
      'Apply': {id: 'Apply', value: 'Zastosuj', comment: 'Text in a button to apply an action'},
      'Attach': {id: 'Attach', value: 'Dołącz', comment: 'Attach'},
      'Azure': {id: 'Azure', value: 'Błękitny', comment: 'Color in our color pallette'},
      'BackgroundColor': {id: 'BackgroundColor', value: 'Kolor tła', comment: 'add or edit text background color in the editor'},
      'Between': {id: 'Between', value: 'Pomiędzy', comment: 'Between in icons for filtering'},
      'Blockquote': {id: 'Blockquote', value: 'Cytat blokowy', comment: 'insert a block quote in the editor'},
      'Bold': {id: 'Bold', value: 'Pogrubienie', comment: 'Make text Bold'},
      'Bookmarked': {id: 'Bookmarked', value: 'Dodany do zakładek', comment: 'Bookmark filled - Element is already bookmarked'},
      'BookmarkThis': {id: 'BookmarkThis', value: 'Dodaj do zakładek', comment: 'Bookmark an element'},
      'Breadcrumb': {id: 'Breadcrumb', value: 'Nawigacja', comment: 'Text describing the Breadcrumb'},
      'BulletedList': {id: 'BulletedList', value: 'Lista punktowana', comment: 'Bulleted List tooltip'},
      'Calendar': {id: 'Calendar', value: 'Kalendarz', comment: 'Inline Text for the title of the Calendar control'},
      'Camera': {id: 'Camera', value: 'Aparat', comment: 'Camera tooltip'},
      'Cancel': {id: 'Cancel', value: 'Anuluj', comment: 'Cancel tooltip'},
      'CapsLockOn': {id: 'CapsLockOn', value: 'Caps Lock włączony', comment: 'Caps Lock On message'},
      'Cart': {id: 'Cart', value: 'Koszyk', comment: 'Cart tooltip'},
      'CenterText': {id: 'CenterText', value: 'Do środka', comment: 'An Icon Tooltip'},
      'CharactersLeft': {id: 'CharactersLeft', value: 'Liczba pozostałych znaków: {0}', comment: 'indicator showing how many more characters you can type.'},
      'CharactersMax': {id: 'CharactersMax', value: 'Maksymalna liczba znaków: ', comment: 'indicator showing how many max characters you can type.'},
      'ChangeSelection': {id: 'ChangeSelection', value: '. Użyj klawiszy strzałek do zmiany wyboru.', comment: 'Audible Text for drop down list help'},
      'Checkbox': {id: 'Checkbox', value: 'Pole wyboru', comment: 'Checkbox tooltip'},
      'Checked': {id: 'Checked', value: 'Zaznaczono', comment: 'Checked tooltip'},
      'Clear': {id: 'Clear', value: 'Wyczyść', comment: 'Tooltip for a Clear Action'},
      'ClearFilter': {id: 'ClearFilter', value: 'Wyczyść filtr', comment: 'Clear the current filter criteria'},
      'Clock': {id: 'Clock', value: 'Zegar', comment: 'Clock tooltip'},
      'Close': {id: 'Close', value: 'Zamknij', comment: 'Tooltip for a Close Button Action'},
      'Copy': {id: 'Copy', value: 'Kopiuj', comment: 'Copy tooltip'},
      'Collapse': {id: 'Collapse', value: 'Zwiń', comment: 'Collapse / close a tree/submenu'},
      'CollapseAppTray': {id: 'CollapseAppTray', value: 'Zwiń pasek aplikacji', comment: 'Collapse App Tray tooltip'},
      'Columns': {id: 'Columns', value: 'Kolumny', comment: 'Columns tooltip'},
      'Component': {id: 'Component', value: 'Składnik', comment: 'As in a UI component - building block.'},
      'Compose': {id: 'Compose', value: 'Utwórz', comment: 'Compose tooltip'},
      'Completed': {id: 'Completed', value: 'Zakończono', comment: 'Text For a Completed Status'},
      'Confirm': {id: 'Confirm', value: 'Potwierdź', comment: 'Confirm tooltip'},
      'Contains': {id: 'Contains', value: 'Zawiera', comment: 'Contains in icons for filtering'},
      'CssClass': {id: 'CssClass', value: 'Klasa CSS', comment: 'Label for entering a Css Class name'},
      'Cut': {id: 'Cut', value: 'Wytnij', comment: 'Cut tooltip'},
      'Date': {id: 'Date', value: 'Data', comment: 'Describes filtering by a date data type'},
      'Delete': {id: 'Delete', value: 'Usuń', comment: 'Delete Toolbar Action Tooltip'},
      'DistributeHoriz': {id: 'DistributeHoriz', value: 'Rozłóż w poziomie', comment: 'Icon button tooltip for action that distributes elements across Horizontally'},
      'Document': {id: 'Document', value: 'Dokument', comment: 'Document tooltip'},
      'Dirty': {id: 'Dirty', value: 'Wiersz został zmieniony', comment: 'Record is dirty / modified'},
      'Drilldown': {id: 'Drilldown', value: 'Przejdź do szczegółów', comment: 'Drill by moving page flow into a record'},
      'Drillup': {id: 'Drillup', value: 'Uogólnij', comment: 'Opposite of Drilldown, move back up to a larger set of records'},
      'Dropdown': {id: 'Dropdown', value: 'Lista rozwijana', comment: 'Dropdown'},
      'DoesNotContain': {id: 'DoesNotContain', value: 'Nie zawiera', comment: 'Does Not Contain in icons for filtering'},
      'DoesNotEndWith': {id: 'DoesNotEndWith', value: 'Nie kończy się na', comment: 'For condition filtering'},
      'DoesNotEqual': {id: 'DoesNotEqual', value: 'Nie równa się', comment: 'Does Not Equal in icons for filtering'},
      'DoesNotStartWith': {id: 'DoesNotStartWith', value: 'Nie rozpoczyna się od', comment: 'For condition filtering'},
      'Down': {id: 'Down', value: 'W dół', comment: 'Down tooltip'},
      'Download': {id: 'Download', value: 'Pobierz', comment: 'Download tooltip'},
      'Duplicate': {id: 'Duplicate', value: 'Duplikuj', comment: 'Duplicate tooltip'},
      'EitherSelectedOrNotSelected': {id: 'EitherSelectedOrNotSelected', value: 'Wybrany albo niewybrany', comment: 'Either Selected Or NotSelected in icons for filtering'},
      'EndsWith': {id: 'EndsWith', value: 'Kończy się na', comment: 'for condition filtering'},
      'EnterComments': {id: 'EnterComments', value: 'Wprowadź komentarze tutaj...', comment: 'Placeholder text for a text input (comments)'},
      'Error': {id: 'Error', value: 'Błąd', comment: 'Title, Spoken Text describing fact an error has occured'},
      'ErrorAllowedTypes': {id: 'ErrorAllowedTypes', value: 'Typ pliku jest niedozwolony', comment: 'Error string for file-upload'},
      'ErrorMaxFileSize': {id: 'ErrorMaxFileSize', value: 'Przekroczono limit rozmiaru pliku', comment: 'Error string for file-upload'},
      'ErrorMaxFilesInProcess': {id: 'ErrorMaxFilesInProcess', value: 'Przekroczono limit dozwolonych plików', comment: 'Error string for file-upload'},
      'EmailValidation': {id: 'EmailValidation', value: 'Nieprawidłowy adres e-mail', comment: 'This the rule for email validation'},
      'Emerald': {id: 'Emerald', value: 'Szmaragdowy', comment: 'Color in our color pallette'},
      'Expand': {id: 'Expand', value: 'Rozwiń', comment: 'Expand open a tree/submenu'},
      'ExpandAppTray': {id: 'ExpandAppTray', value: 'Rozwiń pasek aplikacji', comment: 'ExpandAppTray tooltip'},
      'ExpandCollapse': {id: 'ExpandCollapse', value: 'Rozwiń / Zwiń', comment: 'Text to toggle a button in a container.'},
      'ExportAsSpreadsheet': {id: 'ExportAsSpreadsheet', value: 'Eksportuj jako arkusz kalkulacyjny', comment: 'Export as Spreadsheet tooltip'},
      'Edit': {id: 'Edit', value: 'Edytuj', comment: 'Edit tooltip'},
      'Equals': {id: 'Equals', value: 'Równa się', comment: 'Equals in icons for filtering'},
      'ExitFullView': {id: 'ExitFullView', value: 'Wyjdź z trybu pełnoekranowego', comment: 'Exit Full View tooltip'},
      'Export': {id: 'Export', value: 'Eksportuj', comment: 'Export tooltip'},
      'ExportToExcel': {id: 'ExportToExcel', value: 'Eksportuj do programu Excel', comment: 'Export To Excel menu option in datagrid'},
      'Favorite': {id: 'Favorite', value: 'Ulubione', comment: 'A favorite item'},
      'FileUpload': {id: 'FileUpload', value: 'Przekazywanie pliku. Naciśnij klawisz Enter, aby przeglądać w poszukiwaniu pliku', comment: 'Screen Reader instructions'},
      'Filter': {id: 'Filter', value: 'Filtr', comment: 'Filter tooltip'},
      'FirstPage': {id: 'FirstPage', value: 'Pierwsza strona', comment: 'First Page tooltip'},
      'Folder': {id: 'Folder', value: 'Folder', comment: 'Folder tooltip'},
      'FullView': {id: 'FullView', value: 'Tryb pełnoekranowy', comment: 'Full View tooltip'},
      'GoForward': {id: 'GoForward', value: 'Przejdź dalej', comment: 'Move Page / object this direction'},
      'GoBack': {id: 'GoBack', value: 'Przejdź wstecz', comment: 'Move Page / object this directionp'},
      'GoDown': {id: 'GoDown', value: 'Przejdź w dół', comment: 'Move Page / object this directionp'},
      'GoUp': {id: 'GoUp', value: 'Przejdź w górę', comment: 'Move Page / object this direction'},
      'Graphite': {id: 'Graphite', value: 'Grafitowy', comment: 'Color in our color pallette'},
      'GreaterOrEquals': {id: 'GreaterOrEquals', value: 'Większy lub równy', comment: 'Greater Than Or Equals in icons for filtering'},
      'GreaterThan': {id: 'GreaterThan', value: 'Większy niż', comment: 'Greater Than in icons for filtering'},
      'Grid': {id: 'Grid', value: 'Siatka', comment: 'Grid tooltip'},
      'Hours': {id: 'Hours', value: 'Godziny', comment: 'the hour portion of a time'},
      'HeadingThree': {id: 'HeadingThree', value: 'Nagłówek 3', comment: 'Heading Three tooltip'},
      'HeadingFour': {id: 'HeadingFour', value: 'Nagłówek 4', comment: 'Heading Four tooltip'},
      'Highest': {id: 'Highest', value: 'Najwyższe', comment: 'Highest Four tooltip'},
      'Home': {id: 'Home', value: 'Strona główna', comment: 'Home tooltip'},
      'HtmlView': {id: 'HtmlView', value: 'Widok HTML', comment: 'Html View tooltip'},
      'Image': {id: 'Image', value: 'Obraz', comment: 'Image of something'},
      'Import': {id: 'Import', value: 'Importuj', comment: 'Import tooltip'},
      'Info': {id: 'Info', value: 'Informacje', comment: 'Info tooltip'},
      'InProgress': {id: 'In Progress', value: 'W toku', comment: 'Info tooltip that an action is in progress'},
      'Insert': {id: 'Insert', value: 'Wstaw', comment: 'Insert Modal Dialog Button'},
      'InsertAnchor': {id: 'InsertAnchor', value: 'Wstaw kotwicę', comment: 'Insert Acnhor (link) in an editor'},
      'InsertImage': {id: 'InsertImage', value: 'Wstaw obraz', comment: 'Insert Image in an editor'},
      'InsertLink': {id: 'InsertLink', value: 'Wstaw łącze', comment: 'Insert Link in an editor'},
      'InsertUrl': {id: 'InsertUrl', value: 'Wstaw adres URL', comment: 'Insert a Url in an editor'},
      'Italic': {id: 'Italic', value: 'Kursywa', comment: 'Make Text Italic'},
      'InvalidDate': {id: 'InvalidDate', value: 'Nieprawidłowa data', comment: 'validation message for wrong date format (short)'},
      'InvalidTime': {id: 'InvalidTime', value: 'Nieprawidłowa godzina', comment: 'validation message for wrong time format'},
      'Inventory': {id: 'Inventory', value: 'Zapasy', comment: 'Icon button tooltop for Inventory Action'},
      'IsEmpty': {id: 'IsEmpty', value: 'Jest pusty', comment: 'Is Empty in icons for filtering'},
      'IsNotEmpty': {id: 'IsNotEmpty', value: 'Nie jest pusty', comment: 'Is Not Empty in icons for filtering'},
      'ItemsSelected': {id: 'ItemsSelected', value: 'Liczba wybranych pozycji', comment: 'Num of Items selected for swaplist'},
      'JustifyCenter': {id: 'JustifyCenter', value: 'Do środka', comment: 'justify text to center in the editor'},
      'JustifyLeft': {id: 'JustifyLeft', value: 'Wyrównaj do lewej', comment: 'justify text to left in the editor'},
      'JustifyRight': {id: 'JustifyRight', value: 'Wyrównaj do prawej', comment: 'justify text to right in the editor'},
      'Keyword': {id: 'Keyword', value: 'Słowo kluczowe', comment: 'Describes filtering by a keyword search'},
      'Launch': {id: 'Launch', value: 'Uruchom', comment: 'Launch'},
      'LastPage': {id: 'LastPage', value: 'Ostatnia strona', comment: 'Last Page tooltip'},
      'Left': {id: 'Left', value: 'W lewo', comment: 'Left tooltip'},
      'LessOrEquals': {id: 'LessOrEquals', value: 'Mniejszy lub równy', comment: 'Less Than Or Equals in icons for filtering'},
      'LessThan': {id: 'LessThan', value: 'Mniejszy niż', comment: 'Less Than in icons for filtering'},
      'Link': {id: 'Link', value: 'Łącze', comment: 'Link - as in hyperlink - icon tooltop'},
      'Load': {id: 'Load', value: 'Załaduj', comment: 'Load icon tooltip'},
      'Loading': {id: 'Loading', value: 'Ładowanie', comment: 'Text below spinning indicator to indicate loading'},
      'Locked': {id: 'Locked', value: 'Zablokowano', comment: 'Locked tooltip'},
      'Logout': {id: 'Logout', value: 'Wyloguj', comment: 'Log out of the application'},
      'Lookup': {id: 'Lookup', value: 'Wyszukiwanie', comment: 'Lookup - As in looking up a record or value'},
      'Lowest': {id: 'Lowest', value: 'Najniższa', comment: 'Lowest - As in Lowest value'},
      'Mail': {id: 'Mail', value: 'Poczta', comment: 'Mail tooltip'},
      'MapPin': {id: 'MapPin', value: 'Pinezka', comment: 'Map Pin tooltip'},
      'Maximize': {id: 'Maximize', value: 'Maksymalizuj', comment: 'Maximize a screen or dialog in the UI'},
      'Median': {id: 'Median', value: 'Mediana', comment: 'Median in Mathematics'},
      'Medium': {id: 'Medium', value: 'Średnia', comment: 'Describes a Medium sized Row Height in a grid/list'},
      'Menu': {id: 'Menu', value: 'Menu', comment: 'Menu tooltip'},
      'MingleShare': {id: 'MingleShare', value: 'Udostępnij w aplikacji Ming.le', comment: 'Share the contextual object/action in the mingle system'},
      'Minutes': {id: 'Minutes', value: 'Minuty', comment: 'the minutes portion of a time'},
      'Minimize': {id: 'Minimize', value: 'Minimalizuj', comment: 'Minimize tooltip'},
      'Minus': {id: 'Minus', value: 'Znak minus', comment: 'Minus tooltip'},
      'Mobile': {id: 'Mobile', value: 'Urządzenie mobilne', comment: 'Indicates a mobile device (phone tablet ect)'},
      'More': {id: 'More', value: 'Więcej...', comment: 'Text Indicating More Buttons or form content'},
      'MoreActions': {id: 'MoreActions', value: 'Więcej akcji', comment: 'Text on the More Actions button indictating hidden functions'},
      'MsgDirty': {id: 'MsgDirty', value: ', Zmodyfikowane', comment: 'for modified form fields'},
      'NewDocument': {id: 'NewDocument', value: 'Nowy dokument', comment: 'New Document tooltip'},
      'NewItem': {id: 'NewItem', value: 'Nowy element', comment: 'New item in listbuilder'},
      'Next': {id: 'Next', value: 'Dalej', comment: 'Next in icons tooltip'},
      'NextPage': {id: 'NextPage', value: 'Następna strona', comment: 'Next on Pager'},
      'NextMonth': {id: 'NextMonth', value: 'Następny miesiąc', comment: 'the label for the button that moves calendar to next/prev'},
      'No': {id: 'No', value: 'Nie', comment: 'On a dialog button'},
      'NoResults': {id: 'NoResults', value: 'Brak wyników', comment: 'Search Results Text'},
      'Normal': {id: 'Normal', value: 'Normalny', comment: 'Normal row height'},
      'Notes': {id: 'Notes', value: 'Notatki', comment: 'Notes icon tooltip'},
      'NotSelected': {id: 'NotSelected', value: 'Niewybrany', comment: 'Not Selected in icons for filtering'},
      'NumberList': {id: 'NumberList', value: 'Lista numerowana', comment: 'Number List tooltip'},
      'OpenBackClose': {id: 'OpenBackClose', value: 'Otwórz / Wstecz / Zamknij', comment: 'Open / Back / Close tooltip'},
      'OpenClose': {id: 'OpenClose', value: 'Otwórz / Zamknij', comment: 'Open / Close tooltip'},
      'OrderedList': {id: 'OrderedList', value: 'Wstaw/Usuń listę numerowaną', comment: 'Insert an Ordered list in the editor'},
      'Page': {id: 'Page', value: 'strona ', comment: 'Text on the pager links'},
      'PageOf': {id: 'PageOf', value: 'Strona {0} z {1}', comment: 'Pager Text Showing current and number of pages'},
      'PageOn': {id: 'PageOn', value: 'Bieżąca strona ', comment: 'Text on the pager links'},
      'Paste': {id: 'Paste', value: 'Wklej', comment: 'Paste icon tooltip'},
      'PasswordValidation': {id: 'PasswordValidation', value: '<strong>Hasło</strong><br>Musi zawierać co najmniej 10 znaków<br>Musi zawierać do najmniej jedną wielką literę<br>Musi zawierać co najmniej jedną małą literę<br>Musi zawierać jeden znak specjalny<br>Nie może zawierać nazwy użytkownika<br>Nie może być poprzednim hasłem<br>', comment: 'Password validation requirements'},
      'PasswordConfirmValidation': {id: 'PasswordConfirmValidation', value: 'Hasło musi być zgodne', comment: 'Password Confirm validation'},
      'Peak': {id: 'Peak', value: 'Szczyt', comment: 'the max or peak value in a chart'},
      'PersonalizeColumns': {id: 'PersonalizeColumns', value: 'Personalizuj kolumny', comment: 'Customize Columns in a Grid'},
      'Period': {id: 'Period', value: 'Okres', comment: 'the am/pm portion of a time'},
      'PressDown': {id: 'PressDown', value: 'Naciśnij strzałkę w dół, aby wybrać datę', comment: 'the audible label for Tooltip about how to operate the date picker'},
      'PressShiftF10': {id: 'PressShiftF10', value: 'Naciśnij klawisze SHIFT+F10, aby otworzyć menu kontekstowe.', comment: 'the audible infor for screen readers on how to use a field with a popup menu'},
      'Previous': {id: 'Previous', value: 'Poprzedni', comment: 'Previous icon tooltip - moved to previous record'},
      'PreviousMonth': {id: 'PreviousMonth', value: 'Poprzedni miesiąc', comment: 'the label for the button that moves calendar to next/prev'},
      'PreviousPage': {id: 'PreviousPage', value: 'Poprzednia strona', comment: 'Previous Page tooltip'},
      'Print': {id: 'Print', value: 'Drukuj', comment: 'Print tooltip'},
      'Range': {id: 'Range', value: 'Zakres', comment: 'Range for tooltip'},
      'RecordsPerPage': {id: 'RecordsPerPage', value: 'Liczba rekordów na stronie: {0}', comment: 'Dropd own allows the user to select how many visible records {} shows select value.'},
      'Redo': {id: 'Redo', value: 'Wykonaj ponownie', comment: 'Redo tooltip'},
      'Refresh': {id: 'Refresh', value: 'Odśwież', comment: 'Refresh tooltip'},
      'Required': {id: 'Required', value: 'Wymagane', comment: 'indicates a form field is manditory'},
      'Reset': {id: 'Reset', value: 'Resetuj', comment: 'Reset tooltip'},
      'ResetDefault': {id: 'ResetDefault', value: 'Resetuj do domyślnych', comment: 'Reset Datagrid Columns, Filter and other Layout'},
      'Results': {id: 'Results', value: 'Wyniki', comment: 'As in showing N Results in a List'},
      'RightAlign': {id: 'RightAlign', value: 'Wyrównaj do prawej', comment: 'Right Align tooltip'},
      'RightAlignText': {id: 'RightAlignText', value: 'Wyrównaj do prawej', comment: 'Right Align Text tooltip'},
      'Right': {id: 'Right', value: 'W prawo', comment: 'Right'},
      'Roles': {id: 'Roles', value: 'Role', comment: 'Roles tooltip'},
      'RowHeight': {id: 'RowHeight', value: 'Wysokość wierszy', comment: 'Describes the Height for Rows in a Data Grid'},
      'Ruby': {id: 'Ruby', value: 'Rubinowy', comment: 'Color in our color pallette'},
      'RunFilter': {id: 'RunFilter', value: 'Uruchom filtr', comment: 'Execute the current filter criteria'},
      'Save': {id: 'Save', value: 'Zapisz', comment: 'Save tooltip'},
      'SaveCurrentView': {id: 'SaveCurrentView', value: 'Zapisz bieżący widok', comment: 'Datagrids contain view sets. This menu option saves them'},
      'SavedViews': {id: 'SavedViews', value: 'Zapisane widoki', comment: 'Label for a list of Views'},
      'Seconds': {id: 'Seconds', value: 'Sekundy', comment: 'the seconds portion of a time'},
      'Search': {id: 'Search', value: 'Wyszukaj', comment: 'Search tooltip'},
      'SearchColumnName': {id: 'SearchColumnName', value: 'Wyszukaj nazwę kolumny', comment: 'Search for a datagrid column by name'},
      'SearchFolder': {id: 'SearchFolder', value: 'Wyszukaj w folderze', comment: 'Search Folder tooltip'},
      'SearchList': {id: 'SearchList', value: 'Wyszukaj listę', comment: 'Search List tooltip'},
      'Select': {id: 'Select', value: 'Wybierz', comment: 'text describing a select action'},
      'Selected': {id: 'Selected', value: 'Wybrany', comment: 'text describing a selected object'},
      'Send': {id: 'Send', value: 'Wyślij', comment: 'Send tooltip'},
      'SetTime': {id: 'SetTime', value: 'Ustaw godzinę', comment: 'button text that inserts time when clicked'},
      'Settings': {id: 'Settings', value: 'Ustawienia', comment: 'Settings tooltip'},
      'Short': {id: 'Short', value: 'Niski', comment: 'Describes a Shorted Row Height in a grid/list'},
      'ShowFilterRow': {id: 'ShowFilterRow', value: 'Pokaż wiersz filtru', comment: 'Toggle a row with filer info above a list'},
      'ShowLess': {id: 'ShowLess', value: 'Pokaż mniej', comment: 'Show less form content'},
      'ShowMore': {id: 'ShowMore', value: 'Pokaż więcej', comment: 'Show more form content'},
      'Slate': {id: 'Slate', value: 'Ciemnoszary', comment: 'Color in our color pallette'},
      'SliderHandle': {id: 'SliderHandle', value: 'Uchwyt dla', comment: 'Description of the portion of a Slider control that is focusable and changes its value, followed in code by the name of the control'},
      'SliderMaximumHandle': {id: 'SliderMaximumHandle', value: 'Uchwyt zakresu maksymalnego dla', comment: 'Describes a maximum value handle in a Range (double slider), followed in code by the name of the control'},
      'SliderMinimumHandle': {id: 'SliderMinimumHandle', value: 'Uchwyt zakresu minimalnego dla', comment: 'Describes a minimum value handle in a Range (double slider), followed in code by the name of the control'},
      'SkipToMain': {id: 'SkipToMain', value: 'Przejdź do zawartości głównej', comment: 'Skip link in header, jumps when clicked on to main area'},
      'StartsWith': {id: 'StartsWith', value: 'Rozpoczyna się od', comment: 'for condition filtering'},
      'StrikeThrough': {id: 'StrikeThrough', value: 'Przekreślenie', comment: 'turn on and off strike through text in text editor (like word)'},
      'SortAtoZ': {id: 'SortAtoZ', value: 'Sortuj rosnąco', comment: 'Sort A to Z in icons for filtering'},
      'SortZtoA': {id: 'SortZtoA', value: 'Sortuj malejąco', comment: 'Sort Z to A in icons for filtering'},
      'SortDown': {id: 'SortDown', value: 'Sortuj w dół', comment: 'Sort Down tooltip'},
      'SortUp': {id: 'SortUp', value: 'Sortuj w górę', comment: 'Sort Up tooltip'},
      'Subscript': {id: 'Subscript', value: 'Indeks dolny', comment: 'Turn on and off Subscript text in text editor (like word)'},
      'Superscript': {id: 'Superscript', value: 'Indeks górny', comment: 'Turn on and off Superscript text in text editor (like word)'},
      'Tabs': {id: 'Tabs', value: 'Karty...', comment: 'Used in the Tabs Control\'s more menu, preceeded by a number that describes how many tabs are in the spillover menu'},
      'Tack': {id: 'Tack', value: 'Przypnij', comment: 'Pin an object'},
      'Tall': {id: 'Tall', value: 'Wysoki', comment: 'Describes a Taller Row Height in a grid/list'},
      'Target': {id: 'Target', value: 'Docelowy', comment: 'Label for an input to enter a Target (Url Attribute)'},
      'TextColor': {id: 'TextColor', value: 'Kolor tekstu', comment: 'add or edit text color in the editor'},

      'Timer': {id: 'Timer', value: 'Czasomierz', comment: 'Timer tooltip'},
      'Today': {id: 'Today', value: 'Dzisiaj', comment: 'refering to today on a calendar'},
      'ToggleBold': {id: 'ToggleBold', value: 'Przełącz na tekst pogrubiony', comment: 'turn on and off bold in text editor (like word)'},
      'ToggleH3': {id: 'ToggleH3', value: 'Przełącz na nagłówek 3', comment: 'turn on and off heading 3 text'},
      'ToggleH4': {id: 'ToggleH4', value: 'Przełącz na nagłówek 4', comment: 'turn on and off heading 4 text'},
      'ToggleItalic': {id: 'ToggleItalic', value: 'Przełącz na tekst kursywą', comment: 'turn on and off Italic in text editor (like word)'},
      'ToggleUnderline': {id: 'ToggleUnderline', value: 'Przełącz na tekst podkreślony', comment: 'turn on and off Underline in text editor (like word)'},
      'Toolbar': {id: 'Toolbar', value: 'Pasek narzędzi', comment: 'describing the toolbar component'},
      'TopAlign': {id: 'TopAlign', value: 'Wyrównaj do góry', comment: 'Top Align tooltip'},
      'Total': {id: 'Total', value: 'Suma', comment: 'Mathematic total of a calculation'},
      'Totals': {id: 'Totals', value: 'Sumy', comment: 'Mathematic total of a calculation (plural)'},
      'TreeCollapse': {id: 'TreeCollapse', value: 'Zwiń drzewo', comment: 'Tree Collapse tooltip'},
      'TreeExpand': {id: 'TreeExpand', value: 'Rozwiń drzewo', comment: 'Tree Expand tooltip'},
      'Turquoise': {id: 'Turquoise', value: 'Turkusowy', comment: 'Color in our color pallette'},
      'Up': {id: 'Up', value: 'W górę', comment: 'Up tooltip'},
      'Upload': {id: 'Upload', value: 'Przekaż', comment: 'Upload tooltip'},
      'UnavailableDate': {id: 'UnavailableDate', value: 'Data niedostępna', comment: 'Unavailable Date Text'},
      'Underline': {id: 'Underline', value: 'Podkreślenie', comment: 'Make text Underlined'},
      'Undo': {id: 'Undo', value: 'Cofnij', comment: 'Undo tooltip'},
      'Unlocked': {id: 'Unlocked', value: 'Odblokowano', comment: 'Unlocked tooltip'},
      'UnorderedList': {id: 'UnorderedList', value: 'Wstaw/Usuń listę punktowaną', comment: 'Insert an Unordered list in the editor'},
      'Unsupported': {id: 'Unsupported', value: 'Zawartość jest niedostępna, ponieważ wykorzystuje funkcje, które nie są obsługiwane przez bieżącą wersję przeglądarki.', comment: 'Suggesting browser upgrade for missing features.'},
      'Url': {id: 'Url', value: 'Adres URL', comment: 'Url tooltip'},
      'UseArrow': {id: 'UseArrow', value: '. Użyj klawiszy strzałek do dokonania wyboru.', comment: 'Instructional comments for screen readers'},
      'UseEnter': {id: 'UseEnter', value: '. Naciśnij klawisz Enter lub strzałkę w dół, aby wyszukać.', comment: 'Instructional comments for screen readers'},
      'User': {id: 'User', value: 'Użytkownik', comment: 'User tooltip'},
      'UserProfile': {id: 'UserProfile', value: 'Profil użytkownika', comment: 'User Profile tooltip'},
      'VerticalMiddleAlign': {id: 'VerticalMiddleAlign', value: 'Wyśrodkuj w pionie', comment: 'Vertical Align tooltip'},
      'ViewSource': {id: 'ViewSource', value: 'Pokaż źródło', comment: 'Toggle the source view in the editor'},
      'ViewVisual': {id: 'ViewVisual', value: 'Widok wizualizacji', comment: 'Toggle the visual view in the editor'},
      'Yes': {id: 'Yes', value: 'Tak', comment: 'On a dialog button'}
    }
  });
}));