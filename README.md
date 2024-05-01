# TODAY

Этот проект не имеет смысла. Он развлекательный. Пока я придумал только цвет и эмодзи дня, других идей у меня нет.
Если у вас есть идеи, как его можно дополнить, то свяжитесь со мной (как-нибудь).


Вы можете спокойно взять мои "гениальные" наработки в файлах этого проекта, но только не забудьте, пожалуйста, отметить меня.

## Translation and better article
[Click here!](https://arbuz.icu/blog/today-project/)

## А как потестить?
Все просто. [Кликай сюда](https://today.arbuz.icu/)

## Формулы!!!!

* `t` - timestamp - const - 00:00 этого дня по UTC. 

### Эмодзи:
В формуле используется некоторые коэффициенты, которые уже подставлены. Формула не совсем адаптирована. 
Некоторые символы в Unicode отсутствуют, поэтому я постарался найти самые длинные последовательности подряд идущих эмодзи.

* `tr` - `vector<int>` - const - начало последовательностей символов (в Unicode).
* `ts` - `vector<int>` - const - разность между номерами первого и последнего элемента последовательностей.
* `cet(t)` - функция, используя которую подсчитывается номер последовательности эмодзи.
* `cev(t)` - функция, используя которую подсчитывается decimal значение эмодзи в Unicode.

$$cet(t) = \left\lfloor 23 \cdot \left(3 \sqrt[3]{t} + 0.7 \cdot \log(t + 5) \cdot 13 + \frac{t \bmod 86400}{86400} + 11 \cdot \log_2(t) + 17 \cdot \sin\left(\frac{2 \pi t}{86400}\right) + 2 \cdot \cos\left(\frac{2 \pi t}{86400}\right) + \left\lfloor \frac{t}{86400} \right\rfloor^2\right) \right\rfloor \bmod 5$$

$$cev(t) = tr[cet(t)] + \left\lfloor 17 * (3 \cdot sin(2 * pi * t / o.7) + 5 * (3 \sqrt[3]{t} + 13 \cdot \log(t + 11)) \right\rfloor \bmod ts[cet(t)]$$

и выводится пользователю, конечно, эмодзи в формате: `&#{cev(t)};`.

### Цвет:
Здесь используются некоторые циклические операции, поэтому записать это в формульном виде будет довольно сложно.
Оформлю это в виде псевдокода с примесью из математических формул. Возможно, что этот псевдокод может показаться нестандартным.
Но я гений, миллиардер и филантроп. Я имею полное право использовать свой алгоритмический язык, если я уверен, что он будет понятен читателю (это, в общем, смесь языков, но, думаю, все очевидно).

* `sv(t)` - функция, используя которую заполняется массив (в виде функции не реализована)
* `cf(n)` - функция, используя которую заранее подсчитывается факториал (в виде функции не реализована)
* `num2permutation(k, n)` - функция, используя которую определяется нужная расстановка (из $n!$) последовательности, соответствующая номеру k при расстановке в лексикографическом порядке.

```
func sv(int t) -> vector<int> {
  vector<int> el(3, 0);

  el[0] = t mod 1000;
  el[1] = ⌊(t mod 1000000 - el[0]) / 1000⌋;
  el[2] = ⌊(t - el[1] - el[0]) / 1000000⌋;

  return el;
}
```

```
func cf(int n) -> vector<int> {
  vector<int> factorials(n + 1, 1);
  for i from 2 to n + 1 {
    factorials.push(factorials[i - 1] * i);
  }

  return factorials;
}
```

```
func num2permutation(int k, int n) -> vector<string> {
  vector<string> permutation(n, "0");
  vector<bool> was(n+1, false);
  int cur_free, already_was;

  for i from 1 to n {
    already_was = ⌊k / factorials[n - i]⌋;
    k = k mod factorials[n - i];
    cur_free = 0;

    for j from 1 to n {
      if was[j] is false:
        cur_free += 1;

        if cur_free == already_was + 1:
          permutation[i - 1] = (el[j - 1] mod 256) -> string;
          was[j] = true;
    }
  }

  return permutation;
}
```

выводится цвет, конечно, в формате rgb.

---

*p.s. Я чувствую, что задачу с нахождением нужной расстановки можно решить с меньшей асимптотикой (`color.js`). Если у вас есть идеи, то напиши об этом, пожалуйста, мне.*
