# Inżynieria Oprogramowania - praktyczne laboratoria projektowe

## Kwestie organizacyjne.

1. We kwestiach niespecyficznych obowiązuje regulamin studiów.

2. Co 2 zajęcia (zazwyczaj 2 tygodnie) ma miejsce oddawania kolejnego etapu projektu podlegającego ocenie, polegające na:
- przedstawieniu wymaganych elementów przez grupę (5 min):
  - omówienie askpektu projektowego wraz z kluczowymi diagramami dla danego zagadnienia
  - omówienie napisanego kodu źródłowego
  - zaprezentowanie działających przykładów
  - przedstawienie tabelki z: nazwą wykorzystanej technologii AI, obszarem zastosowania, rezultatami, % objętości pracy wykonanej z pomocą AI. 
- pytania i dyskusja (5 min) zakończone wystawieniem oceny.

3. Ocena końcowa z zajęć praktycznych jest wyznaczana z 2 składowych:
- średniej arytmetycznej z 6 uzyskanych ocen w ciągu semestru
- informacji zwrotnej dotyczącej zaangażowania w projekt przekazanej przez członków zespołu oraz wynikającej z aktywności w repozytorium git.

## Ramowy plan zajęć:
1. Zajęcia wprowadzające. Wybór grup 3 osobowych, tematyki projektu oraz technologii. Omówienie 4 przypadków użycia. Dyskusja nad prototypem (ewolucyjnym lub z porzuceniem).

2. Omówienie wykonanych prototypów, wybór tematu na zajęcia 4-5 (2 tyg) oraz omówienie wymaganych elementów. Rejestracja na github. Założenie brancha i folderu grupowego. Wrzucenie prototypu na repo.

3. Ocena 1 – Inżynieria Wymagań. Wymagane elementy:
- Historie użytkownika (User stories) [https://pl.wikipedia.org/wiki/Historyjka_u%C5%BCytkownika]
- Diagramy przypadków użycia (Use-case) UML [https://online.visual-paradigm.com/pl/diagrams/tutorials/use-case-diagram-tutorial/]
- Diagram Wymagań (Requirements) SysML [https://sysml.org/sysml-faq/what-is-requirement-diagram.html]
- Kategoryzacja na wymagania funkcjonalne i niefunkcjonalne
- NIE jest wymagana jest działająca implementacja na tych zajęciach.

4. Omówienie projektów, konsultacje, wybór tematu na zajęcia 6-7 (2 tyg) oraz omówienie wymaganych elementów.

5. Ocena 2 + Stworzenie planu działania w formie listy zawierającej co najmniej 1-2 rzeczy z przygotowanej listy przez prowadzącego

6. Omówienie projektów, konsultacje, wybór tematu na zajęcia 8-9 (2 tyg) oraz omówienie wymaganych elementów.

7. Ocena 3 + Stworzenie planu działania w formie listy zawierającej co najmniej 1-2 rzeczy z przygotowanej listy przez prowadzącego

8.  Omówienie projektów, konsultacje, wybór tematu na zajęcia 10-11 (2 tyg) oraz omówienie wymaganych elementów.

9. Ocena 4 + Stworzenie planu działania w formie listy zawierającej co najmniej 1-2 rzeczy z przygotowanej listy przez prowadzącego

10. Omówienie projektów, konsultacje, wybór tematu na zajęcia 12-13 (2 tyg) oraz omówienie wymaganych elementów.

11. Ocena 5 + Stworzenie planu działania w formie listy zawierającej co najmniej 1-2 rzeczy z przygotowanej listy przez prowadzącego

12. Omówienie projektów, konsultacje.

13. Ocena 6 – podsumowanie projektu, sprawdzenie wykonanych rzeczy z formatki, wystawienie oceny końcowej z uwzględnieniem aktywności i udziału w projekcie poszczególnych osób.

---

## Lista zagadnień do uwzględnienia w projekcie [wraz z przykładami]:
1. Architektura aplikacji (Projekt ogólny / high-level design):
- UML Class Diagram
- UML Component Diagram
- UML Communication Diagram
- Deployment diagram 
- Architecture Decision Records [https://github.com/joelparkerhenderson/architecture-decision-record]
Architektura i setup projektu: 
- wstępnie skonfigurowane repozytorium Git ze zdefniowaną strukturą folderów zgodną z przyjętym standardem architektury, języka programowania oraz adekwatny plik .gitignore
- wybrany i zainicjowany framework/biblioteka 
- Standardy kodowania oraz narzędzia do ich automatycznego wymuszania (linter, formatter)

2. Testowanie aplikacji:
- Testy jednostkowe
- Testy komponentów
- Testy wydajności
- Fuzz testing (fuzzing)
- Testy akceptacyjne UAT (wykorzystujące UI).

3. Baza danych lub inne trwałe przechowywanie danych (persistent storage) np.: Azure Blob lub AWS S3, etc.
- Data Flow Diagram
- Data model diagram (ERD)
- Implementacja zapisu i odczytu danych
- Walidacja danych wejściowych

4. UI/UX
- High Fidelity Mockups (Figma etc) + zdefniowane style
- User Journey: zdefniowane Persony, pełna sekwencja kroków podróży do głównego celu biznesowego dla każdej z nich, touch points dla high fidelity mockups (Figma etc), pain points and opportunities dla danej Persony
- User Flows: dokładny wizualny schemat wszystkich możliwych ścieżek i interakcji w interfejsie (w tym sukcesy oraz błędy); stany systemu (stan ładowania, stany puste, stany błędne); powiązanie każdego kroku z high fidelity mockups 
- repozytorium Git zawierające zainicjowany bazowy projekt w przyjętej technologii (np.: React, Vue, Angular) wraz z narzędziami do budowania i natychmiastowego uruchamiania (np.: npm start). Wybrana i zainstalowana biblioteka do zarządzania stanem (np.: Redux Toolkit, Zustand, Recoil) lub zarządzanie stanem wbudowanych we framework (React Context), do komunikacji z warstwą danych (Axios, Fetch, React Query etc) oraz routingu (React Router, Vue Router, etc)
- zaimplementowane komponenty (przynajmniej tyle ile było już zajęć)


5. Obsługa błędów (errors + exceptions)
- Logowanie
- Wyjątki
- Monitorowanie
- Alerty
