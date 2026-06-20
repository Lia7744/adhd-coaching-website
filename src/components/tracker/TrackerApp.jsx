import { useState, useRef, useEffect } from "react";

const SYMBOLS = ["🌱", "🔥", "⭐", "🦋", "🌊", "🧠", "💎", "🌙", "🎯", "🦅", "🌻", "⚡"];

const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
};

// ============================================================2BhEp8th8vIgMRzXTxZFoZ/XoJL2MFgrmwWbNjU29FewXGizt/TnnGSg2T0a5OMDs2gBwxD4+fmD4Zjmvu+mJrAsBycnR1BJBkso3Dq6oItnMHbv24/N23cgJSYaDQYDYDIhKykenEqBx19+kT58zz0iB4YHx6Cqvh6XG2rRrXNHmCWKj7/6L3p37Yao8GHQqBQQzM3MmEWwQMErAVBUV9dAEiWkx8djRGIimswCdPMX4quffkJOagJq6hvBMgwE0YJGYyM6qJ3QJMn4YUsBis+XwmQRoFGrkBIXA59+fXFw314cOXQICpaFUqHAyWPH4NnFiw7186Pm6ob5AH4GdH9qbjsfPkwAEIuhqZ8owzpHbU+STSkq1Q4lHM+7rHxupRqAEVQmuIV7Zt0WLtbuXYW8Rq0my5fPM1rV+zXf36WsjACgFrMx0NTUEGZ1uW4osGzeuIMSd3d3E0vYcp7jqCTLVOPshKjYOETExELl6ARZai4voZTCSeMAlmEgygIsggksw8BoaEJkaAjKqipx+NRpOGkcIFPg8qVqjIxLQP++/fHB2i+pk8YRCjWHA0XH4OzoiK5dvbB+2zY4OzhheFICeIaBxSyAsAwsgtAcMzDkClt29NQpvPL2ezh+thhKBYcpI7OxvmALCGEASiHLMjQaDXr16IEn33kdd9x9D34uPIQhgwdjyqhs3DltCtwcHPDtV19h546d8PbxQZ8BAyBQCpZhcOr4CabJ0EQgSdH0BFW2t6HqeoZaksRIi7EpmOU4+PgcodczCSnRYUZREKRDh0ucrpjGf3oM4u7p0aO+oaECgADgqhrDti/smjVr+Dmvvy5QSnlZlJJYEI9N334ZsmrVKvnFF19Uttgysz0DyxJCRErkQpVKRUhzRh8WiwUWiwWSJF1pbVWr1eA4FieOHsWG77/Hhu++w8F9eyFTCYLZDG14GD765mtQwoBVsIC1wjdVG0uOnD6laDKboGJ5FJ04ib69ekKWJJw5X4xAP1/U1tVeoYxZhkVV9SXwHG8rUgLHcYiNiMCgwQPwdt6nEC0CBvTrjZraWlTXN4LjOMiUQkFY+PTqj4+++hJzJ03DSw+tQEJ4KFydHdFgaMDPO7ajoboacUlJCImIRFh0DHr26Q1ZllFfV8vU1taAUyh6lPHn+ljH/IbWh21f4jVr1vBxq1aJlFK1xdQUxxHJa/2XX4bm5ORJL774osJ6xMNv5sfmNfz388/PgRCpa9eufZq9DN0tFZBb6mJVensTAPD0cO9RVllmtGotBlepo7IGjxSATCklH72x5j88lXuajUa5/ELpW8f3708dGBBQeuedd97ILciUUlJbWvqy0WSerFGrFU3GJtGqlVk0N0CAYRiwLINdO7bj1PFjULAsCCH4Zd8+lJdXIEobi/69esJ/wGDc/fRjePq++8FDAKdicbDoEBRKFdQKJSBTNBiN6K1SQBIEGA1mKDjG2mfeXMxoMBhQbzCgZ5duEEWxufCKENTUXEZicBg2FGzFqXNn4eXuBplS1NbVw6OTK8CxqKipwTPvvo7XHnkUSdFhuFBZDo7lwBAGhDKIjo1vztwrlLCYBTg4OMDZ2aXZAgkizGaL1NldzZrrmwYBOHqjeYhWc8TkvfvO61QUvEyCRa4qLXn73LFzw3sN6nW2DeECIQTr1q1jh6WkYFvzzie3HLc2D2L1SWvq6gQHtYa52mxQStm9e/c61paVOdZVVXWRWDns4zUvTxCMxjCzxSJTSgkx1A/ZtW3zz7lvrXmNYZU7NE5OJ7u5uxssanVjcHCwcI0Jla297AcqSs/FKVj2zQ6uroOoTGFoNEASJVAASpUSRw4exMkjR+DgoGmeTACOGgdUXSxFaXEJ1GoNxo3IgCCImLt8BZYvXoB+PXvgnc8/x4rFC2EWBKjUKvTw6Iz9h45h8oTJkKiEE2fOY1BiX1RWVIDjGRjMRhiazOA4HhaLpbmcBYBCoURl3WXU1xrg7OwMlrAgDGAymQHIcNSo8O0Pm6AgLMZmZOBSTRU4woAFCypZwPFKGMwmmCUBSpUaliYjzp85g5NHjoJXKCBTClkC5TgOoix4NpN87ZvG/Px8zsnJSXHmzCFnlaDo3WRuDHh39QvjicUcZTFbZArAZKj1yf9xbcEnb/7nPx06dNitclSfE+vNVV7e3sYhQ4ZYWk45Qxj5bEkJAYC8f7SA2BIhkkCa65rIlfjDZoJ3797dwWQwjGloqIs1CU1a1ix6EVGAydAgEpbjGIaB2WyWWIKujEr5qMFQW0sZaXtZI1/g4eT0NaX0ZAvt9jusWrVKtibHtpeWlgZJgpxOJSFdBkawHNNRkmQqmC3k/OkzzclDa4LQYhGbuwrBXFnINbV1mDFWh27du+KJV1bDIgAD+w9CnDYKJedLIFiMyIhLxIRlS7H2q7WYP2U87nnkSTg6OyLYxwdGYxN6dOmB48fOoKa+Hs5ODjCbLaCyDDeXTnj09dfRp3dXdHF3R9mlquZ+EJZp1ioMj9NnzqOqth4vvvs2xqSkwKNjRzQ2NkLToQPqahpxsuQ8gnyG4NCB/TjyyyGYDE3gVBwU1uciNq+USu3S3jYmsHfv3p1PnjyZRs1sap2hOkLFMV2VkFBnaJAIq2AJYWA2GUQlkbuzVPFYZUW5QWl0+dmpg9v3oiiup5QebuHym0rLys4yhGs+7y4vzy4gZovY7HO3EJAWC/oygDUA1tCqKqdtu3b1qaiuWOgAZpahoU4GGKjVGlbt4rrFuWOnx+N9e+3q1C+kjtL2Ex/W7XAYQkgTgM8BfF569vjXjg6Oww1NTVJTQwNnbjKC5VhQAIIgoL+PD3r26g1KZTg5OUMQLOA5DhU1lUgIDob/gIF4/p03UHTiHF594x1kpSTBxaUjPBQcXntEj3n3r8KCqRORmZmM7OnzMKh/X1AqoVsXd/Tu0Qeb9uzGvXPvgIrjwKuU2HHoAPYeOIK3nlqFBkMjzEYzJFmCxsEBkiSCysChE8fRp0cPyBKDZY8+gfEjsxHk7Y1dB3fjlyNFyEpMBACcP3MGlFAMCfKH2diE8+fOgeM4MAyxxjys1M5xowDQq1evMgBvE0LevnjxosOx/buHll0snah0EBcKJpMsywI0Ds4c5RTfaZw6PDukd/+D3sOGXb76JQntHRAksOzt0at0WwgIwwASldtkr2yainTu3ADgFwB3fJOXVyELpx8QJQuUzq7fTpyzYLjYYovRXzeYbh9FaBUSAkABQKwoOXeO41kiyxJVKHgQjsBYZwRYAt+AIPgHBUOUxOaKXEm6EmQrGR41hnoolTyevG85Dhw5htUffIDP1/0Afx8fDOrfG/169EBSQiym3HUv/AYNxDTdaGgjQ6FSqPDB11/j9U8+gamxCRWVl/Ha4w9BwSvw8RffIGd4CpxUKjRZLCitqgZlKFwcVHBUK3G+ogLbdu/BgimTcO/SRdi7qxBrf1iHbT/vRg93T4xOTYZHZ3eYLRZExscDIPD07IKiA3tx9uRp8Go1OCXPGo0GsCx/uFl5V7VXyxBrDEG9vLwMAHYB2PX1px9frCkrflwUzJRzcPl68twF2XIL43S1OWouvLl9NrK+LVgspUJ1pb/7WprKuus7q9VquRFjx/5LZtjjIJzs1sNjjiiKKFyzhm856DeaFba+XyCESJxG+Z/GJpOFISzHK5VSaEQE+gwcgMgYLYb6+cNkMkEURAiC8Jv7plYmSpJlVFVdxoAePbD6sVV4esW9cHV2xsatO/Hk6jdw8uRxrHniEbz/7NN49dH70derC9Z+/z26dXLDgkmTMCojHf/dvBlvfvwFOJbFmfILCBk0BEZJhFtHN+w+chC+gwbD07MrThSXYv6DepgFC1JjtagqOYfeXTywYv4cPLBgDuZNmQB3NzeYLM21WI6OTnDr2AnnTp/Agf17IcginF07yZ06diQGo6XMg1MdsjJI7Q3Qacs5ys3NZXNzdWzW2PFPMrziHK90IN5D/JbIkoRcvV5xrTmiAExG4+2iu2/xXcTGAgUF0GhURGhu4mnPApby9XourqCA8ArVFplhkZycfVGv1zPBc+YImDPnT90SIUSmubkscetytLy4eIajg9OHZrORde/SRfTq3p2hFIxgEduk5215CwKA5RgYLUY0mZrQr1t33Dd3JiRJhiDI4FgCChGgLH4+cBhPrv4P7p4zF74D+oJQGSqNGv9+8x0888abmKobiXC/ALz1ZR4Wz5yOQ7t345sfNqFPz56Yfvc9yPv+BzQZmvDMQyvgN6A/6gz1YIkEY4MAAuCSqRYsQ5rpYFmGLAMnTx7DtoJ8sAxB9x494B8ULCuUSgZm4S3i5WW4kc3l2pojkkPoey+/+C0YLj0kOvqcXq9nclatsmDVqra8BJlSqgxJTOl19Nhha+Cuu6Wh+m0hpizDmJsMDTeaLaUOTh0Om41NCqtlvmml0SQnR7IukI/Kz59pVCm5F1W8oqfRZIbFZAYDItFfK1QJAWFtVKUkSc2VvCwLKsvNm04zLExmAQazqTlnT5hmqyNK0Di54KO8tVg2byaCBw1o3hGFABqLBVkJsXjytTdw8NgJpMfFY8TsOfh83UaUll0EpQy2794LpVqF7NRETBmZhaiAQJjNJih5ZfNmcpChUiuhVjRv+9NgaMKlS5fh4eGB6ss1GDrUF9169EKnzu7WfnsKjqCihbfzh1Hl40MBEKWDpsgiiCpRFBELMKuuP0csyxF1ly5d5JOlpdDpbm2cfktdrIIjRygAbPzpp18cHRy8rAdbytdrm41duVIGAKVGecSxo+shNO+AclPvzbYdjmfPPl8LrGGo0SwuIwx7TKFUwtnFhe3o2oHr6NqBc9CoWVmWqc1yCIIAo9GIJoPBNtugkEEIBcewYBkWDGmu4O3o1hkbthWgV5+eCBs4BFXVl8HwzfttibIMs8kCB5UGG3/ejWn33oPq+jrwLIsx6WlYtXQh3nnxGYQHDkV8eBjiQsJQZ2hEVV0dzl+4AImKcHTQ4MjxM3j+3feQt+5HFB48CLWjBgQy/AODMCwyBh06d8bl2hpYLJbmDSRkJFrZoz9V3nH48GEKgKo06hMubq4HcR3e2GaRfXxyRLPFLGUkJ98WyvvW1mJZjWdEeDhTXFKisFmAdlQXUABw9ep2lpGkBgCoqqq66fU6hBA5NzeX7dx5cAOA5ymlrxhqa30sFks/qcnU32w2y4ThAzUOjjnGpkaZYRhGrW6usbNYLKiuqYFSpYSzk3OzxZBlq9mhcO3giuNnzuDQkWOYN3UqahprwHAcKJXhoNGgg1snbN1/AAaDAZ/99xuUX7qMBRPGY+msGXBxcoCKMGA4FhEBQ/HCmrexa98B9Oziid5duyHIfyicHZ2x65eDeOmd9zF34jh09fRAR5cOUPEKcDwLGQSHT5xCo7ERvbt3B8/zxGKxgBD0ap4c3U2xxt379ylhGJ5eb470ej1ZtWoVnb8sxWvN+++zJoulFGhH4er/ZwGxPbynl9ul8+eK2WdefcsLwHnbYF2PXoyIiDhFKT0NADk5Of+TzGtOs7vV3PhHiADggPUHAHDhwuXuotQwkmM5IkkyQ60ioFQqwfE8yivKUV9fB2fnDuBYHizLQJYpik4dwIGDBzF5zBioOBZGiwUKnodSocSmnbtw/MxZbNrxMwjDoK6hAcFDBuNfixaBkQUYGgwwWDsXOzk646l/3YeqS5ehYDloHBwhCRZQieKtTz/DwumTkRQ2DJeqq6FUqkBlihPni3HszCn08PDE0IEDQUEgixLlOA7EIhdbLQiDP3EUge28lcDA8DMAzrd3jnbs2+fK8RxH2MZKAFi1ciW9Wszyj3CxVq5cSQFg6JCAEsIyzPY9W93+YFD4P4WVbZGaa40oYzurnNITym7dOpVYROHtjp07cxTUTK2Ulmyt4+ratSs6unZEg6ERp0tKcPDYMez95SAsBiPGjRoNN2dnmMwmKDklDGYBz731Pgp/OYzeXXsgcPBgiIwEs2BBXFgonFVKGJqMYFkOLMuA41hYRAEN9Q1wcnAAr+BhMjWBMAQXKipgFGV49+mNuroaKFUOOHTiFD7577c4c/YMIkNDMbBPH2zZtAnnT58Gz/NgWJbKBOcAANcoTb9RK2xVLNeE7WTc6ks13SVJrFv9xGpTc7jG/HMtiG1xz5swwfjmO+80yiLtDWDv7dCLfI37pS2YF4nSXLa83PGuSzV1Pdw9PNJqqi/DYhEk0tz7wUiyTFRKNbp5OqCrR/Ou6yzDgud4ajQbqUk0UYYhLCUMNuQXIDJwKLRh4ZBEC4YnxeLipUv48PO12Hv4GEqrquHooIIoSFfcUNuGdCaTCQzLNnc4AuB4Fg31teA5Fc6Wl+ObHzbA060TtOHh6N2jG4rPnsF3m/NRV1PTXMLfvy+RqEQYjt15K8bWtjdBU1NDb57jazmWNeLXbWb/0SwWA8CiVClrqhtqB+JvBGvJvOzlRQyU0hE1VRfnEYa/q1Mnlx6CxQyzxQRBECHLoixJVu4XBJIssqIoEIWCJxyvgtnYROsb64g2MgIebp1w6dJlUNLchfjM/ffCbLIg7+v/YqlCgdcffwSkhedDQCCJMqrr6uHVubmAURAEeHZ2w4DePbHgQT16dfXCyNQU+PkMApEkHNpXiL179oBhGCh5BZRqFVWwLNPY0FRPlQ4brQH1LSkWFGRpkCTT89a9CVjc4k2sb4dEIUMIkQWL5RdADiSEoOA6Lbe3oZAQQojQ0b3rS5xMAkwWYb5ZxnpRRBkBA7XagXF17ch2cHFlXV06sEqFCpRhzWZRLjGaLD9TwhKNRkNdHTUwNDaC4ViwLAtRpmCJiJceXgFtTBS+z89H0eGjzTsn0uYeFZZlUV/fAKMogGObj0qQKYWC4REXGYlLDdV44M7F8BnYD00Njdi/dy+2F2yFJEgQzAIcXVzQs3cfSaVxIBR4t0uXLlX5+fkc+YublAoKCigB0NRk6O/k4HDsVluO20ZAtNrmLRqUrOKQ0WDsQ24CxXhLXC8Kkp+fz3Xo0aO6g0eX19y8uqWyji4DWaXDYBASJ1KiMxrNY5osok7lqAkgKnYQVagHefbqFyYR/p2OLh2JRRREW4850NySazIL6OCgQeBQbwgmARU1l8FyBLZkpUxliJBRVlYGwjbnVziWQW2TAZ+u/RLPrVgBXpbQ1GSEIAo4f/48evUfgJCISETFxSMuOYU6O7mwtfUNTQpO9W8A5I9s2ncTIMuUEkJJX9Fk2gVcOabtn+1i/dqL7LSvoaJ+8TlZVvcgxIg/fubELZIS0DjEibYTqmJjY2VCSAOAY9afq/PVlDKXL19e0tjYGOHk4DTQYDBIhGFYSgBCZRBGAYsFuHCxDAzPw8nBGTIFDEYD6hob0atnd/Tiu2Lj9m2oa2wERwAPdy/c+8QT6N27H/z6DkR5dSV4jgclBIlpaeA4HiwYEI6FyWySVWoV22g0rXLr3v3CH82g/+nRA+gzr73mLhO5s3vXrodvB4r3trAgubm5MgD4+w3Zx3K84+N3LR9k48XxNwQhhMbFxYm24kcb65Wfn8/ZfqyvMfj15Kt6gZLRkkwaFLyClWVZbu4mBHieQ+XlGuw5fBgeHp0wsHdPsJTAy90LNbW1eOvjj5FfuBdny8rAsQTdunXHp//9Fj8XHcaSaZNQ2VgNjuVBQa27wjOwWMyQJBHnSy6guqaachwLEKK5gU7Mmwrr6WLYuHFzAMNy4lfvvHO6JVX8j7YgNl/3sQceKP9xS0H1sdPHAgHsv5lMlm0Lmr96wFuzXteIYVhCyOEL586NdFAp1ikI5UVBkiRRZp2dVfh8/UacO3UOU8fqoHFwwt6jx8BzLHr17I4u3bpj/v0PQZZFHDlxFvc98wI++eobfPr8y+jRrTsulF0AlRmwbPO6lyQJHMviUn0tampq4OM9EKIkQpJkX0IIzc/Pb5di1ev1N208bQxWo2CIdlBrSgCY8Jfurnlt03broQVHthDRLz4ul2UILfxx4zgSG3vLGYy/EjQ/nyNxcWJZyekMFc/nUkHUMJBpoyiREdPuwKmL5ejToxvq6hpwprwMHAhcHBwQ4O2NY8XncLm6Ft08OiEmNAzdPD2xo/BnhA0JxILpk+BkDf4ppeB5HmonR3yz/gcE+PihYwdnUaXkudp602dd+/Ybl5+fz8XFxf3V484oFQo5JCVlH8/zO/PXrl1gOzPmH29BmuVDiwJaAAXhv5EgPa1SKiksFukmxCEMAHnq1Klhp06dwvbt23fdLprpd5oqLk60WpLvjh86FNG3Z9cPT5Wc83ng6RfFX86cY1mWkJNnz6J/r16YFzUGHp3cYDKbUFZZBb9BAzEs0B/+Qwaju3tnMBQoGT0Cb+d+jjseWI6ctExEhgaBYRkUl5Sh8JcidOrsCohmlF+8iP79+4FlzaS94xkZGenXsWNHx2+++Wb7TRhPAkA2mc3KoITEfgP7D/xXy9jUjhYu0Jz77us1NCbasGC5fkDL1//sdUeMGBHh5+d30LpNKXO7jgOllOj0OgUAzFuy7Jl+w4YJXNfu1Ds6it79wP3i5k2baPmZU9RQcYE2VZXSpkul1Hi5jDZdukgby4vppXMn6YWTR2nJ8cO04sxxar5cQXds3UKX3XsfnbNoIV189zJ6378eoLm5n9CL507Q159+mG5cmytQQw0tPXfqUes9XEtpMhzHITAwcIdWq820xg9/aoM52+dHTpsWHxAbW7vt6Dan28m7uZ0CYcKyLPWNjj7RqbPHexvzPnv8Jp12ygKQvL29v9VoNG8XFhautb122/FgAKPgeSlr8pSPN/+8ezxLCLTDQjc9vmxRZN8B/VU1FeWyySJQWZLYloaVgoABAWEYUKb5SDYFy0ISZag1SihYDpXVNZAkGU5OjnBQq1G0bz/yN23CsMhIKSI6ii2/XDOuW5/+n12DxWIA0LCwsIjGxsbHDx8+rKVtn0J8A+5D8+nGoWlpL0kmi/++zT/FWI/Duy3m57bRplqtlpUkCS7OrutrqmsyyU0+7bRLly6rCSH3cByH2xF6vZ4oFApp/B13/HvLnj3jOUKEnPT0e7756MPEHl27RF8qK/+cMizjoNGwhBCZYVi5uSaLA8eyYFgGhAAcCMyNjSg6eBCHiw7ixNFjKC27CJVKCWcnR0iiiMbGRpw+dQoOjhravU8PtqauwcKA3QUAsNbHXZ1PILSpqWlFly5d3qOUoo1TiG9MKRQUyJRSpSSJw51cnL6gzacb21tuW8Pmc7o6ubxPiBz02Y8/9sDNOVReAsD+9NNP31NKxfT09CwA0p91DW4yzcmuWrVKnrtsWdDWfXvvJqCICQ2+a/UzTz+jjY1VKjp0Luzco49OpFyKIEkFLi7OjEatZpprwajcwkUDx3I4sGcvCnfsRNG+fdhRUICffliPgo0bcWj/fpSXXsCh/ftQUlKCAd4+UhevbtQoClu69OlznlLKkKszUywAKT4+PkShUHRfv379+wCYP2vdrVS+PG/Fiv6SxeLl7+2di7ZPN7a7WLZJDkhMLOni4fHsdx999EJsbOxNc7OSkpLSqqqqHjp06FC4JEm3kZulYxnmCykoIeGLUxcujOrXpfvne/M36mRZ5gEItpyJzfWpv1QxRhbMK3iOD7BYzDCajBJACCVgFDyP08eOY/f27VCoeDCEgSzLEEUJlDZ3DVosFgwYMBDBUVGiW+fOXK3BOMWjS/cPKKUcIeRqY81yHCcNHjx4PcMwr/3yyy9f3Qw3VavVclsKCsR4ne7l8oqK0KPbtg6TZXpbkSi3U8BKtVotyxBCnZ2c1lZVX56q4Pmb5WZJANjNmzev4ziuPikpaSYASavV3nJ/q9lC5kkffJDbp6quPkOjVMnRwaGPy7JMbJsmWEvGJWrdstPZzePzH7d2D7FI8mzCssecnFxYjUbDUJlSi0WQ+vbvR30DA6wH+FhgsW4swbAsOri6YlhUDIZFR4suLk7cpeqaPe5e3XKtQii1pVwiIiJGAtAcPHjwpggHAFJQUCDKlHImg2GSh5vbB7JMyU1w2/7/s1kPP/uEX1B8nLRg+fKbwmbZrkEpJYsXL/b18fEpuueee5ysE31LrahNSHNmzBjn5edPfWK0h61MErkG23XFPSwqKlJUll3IuXzx/M91ZSXUUFlOq4pP08rik9L5wweEfVs2idvWfyNt//Fb+dDOLVLp8SKx6sJpS215Ca0sOVdfW1HRz3pNpg2rzpaVlTkMHTr0eHh4eAB+7f//024lAJIxdmL0kMjIhtwffuhoY/LsknAdq8ZzHMLS0g7FZIx4peUiuglgASAoKOjhoKCgdwkhuNVWxPb9qTljHvbw9aXDklPfZwgBrh8jkZaCQill6i9XRF4qLX7/csn58tqLxdRUW0mN1RW0obKU1pUX0/qKEtpQVUqbLl2k1RWlZ86fPx0FtH2wje3eQkNDXwwODn6t5RjejLlgCEFIcsp3MSNGbGLITb32/0sXyzYpjCCKpGfXri/UN9VNopSqCm7eSUMyALawsPBhURRDYmJiUgsKCsRbGbBbz+Ejl2trVYRloOSVl2RKCazlF9dySVt0ObKEENm5k8d2t649pjCOzoPMQJqhyfxKbb1ha72h6azRLFY1mSynLGZhg1Gkdwio8e3Zs+82SinTRissW1BQICYnJ0dIkpTxr3/9617rAv7TLq/VSkiPvPBCZ6NoTurXq9cqmYLodDrY0b7BI5RSp6D4uLq4rKwZN9mKMACQlZUV4O3tfeLZZ5/taH3trzTttqJA4u3trSCEICAl8c1OQ4bQgLjEVwCQoNmzedt79Xo9o9Pp2Ou4miQ3N5elV7EGlFIFpdSJUsq3ep25xhywa9as0QwePPjouHHjUimlzM06llmr1XKEEMRmZ//bLy72sJV6t8ceNzSAAEbPueMlv2jtca55h3PmZl4fAPz9/Rd7e3uvJ4QgKCiI/18Iu+1Hr9e3ucA2fv21R/+IYbVOAwZQ3+iYwyql8noWnrTje9n8/HyOtvpOSiljrSi+6jWsrbysWq1GQEDAN0FBQQ9a/8W1vP4ftrpWBVhRUeEYEB9nHDN9+vSbrAD/OVZk/fbt7n5xMULGxCkjWwR2N6Spbdr3Kv/jCCEYMmTIp/7+/s+3XgT/y2ejlLI7iovVCZOzOyVkZ2fGjxixK37M6Mb+4eFN/SPCaXL2qBf1zzzjZj1Ah5t01129x82anjNr4cJohmGukA46K6t1vcC2paC24xZ5nueh1WqfDAgI+FGhUECr1bYUKHI1YuVGlVNIQsKiwIT4MqtVuyVl9u019bcndDoWeXlSSHLi0xajOfvIrp0DhBUPMLhOibVOp2MrKytJQUEBvQ4VSQAwlFISEBCwR61Wv7Fr167VgYGB/N69e4WbIOBYt25d17KyS0nHzp5yv1BeNqS6prrWpUOHvs7OzoPLqiovUElWatTKOveO7nx5VQWrVKlOG03GURqNw4HL1ZddahrrT/GU6a5WKj26d+uy02w0m9RKjbp/v94rly9devRmD/nUqVNVH374oSkuLm56RUXFXY888kh4dna2wdpTbGstpu+//4X7hm3r495fsybXWtJvO/SItmO9kbOUKjKiIkv69+v/8DcffPDy6NGj2by8PMkuIDe4yAghZP/+/c5TlyypdHZyytn27bdftbcM2nr2Ojdzyby+SkbdJScra+tVyriJVahcDx8+vG3gwIFPfvnll+8HBQX9KSGxLaRvv/12sEkQhsmyXFdbb3BxcnS8ZBEtY8sqK+RLl2sc6xrrGwnDaAx1dY69e3bfzcqMV21DXfGh48cjBw0c3EGh4rZbjOaT3bp1C1Jy3N5e3bpdXr9pU6NKocjy9/c/Xltff8bT1VVwdHSs7NOnT5GPj4/wJ3rJOQCiv79/YlNT04vu7u6x27Ztq7Iuftk2Hxs2bHB67MWX93fu5Hrhm88+jXn00ccG3HPPPSfa00Num7u47Ox/1ZualhWuW9+5Rc/MbVm9y96uArJq1SpotVr2gQceaBrg78vX1tc9VHH23AvTv/8eOHKkLdqTO3GxZKSLl9csz1695/7nvfcerm0wzCwpr1xUW2/YWrhj2xmdTscesW55arM4eXl5TUlJSd8eOXLkfUEQ9p89e/YMAP6PMDY24SgtLXWTJMk9KSHhR5XCcqlHt17nqCQO7ahSfeTu4rLbe9DA415e7uc0Kg0XGR6+WxJpRyrJ+/v372duEkzHWYrwzm5ulxzVmoamhoYLG7///l21SnUuIjDQS6fTvblv/yGNQsmXyRrNke6dO7uq1epaDw8Pyx8VDkdHRzEoKCihoaHhrczMzLGfffbZaetYyQCwefNm7vz589K5urqHVSplrw1r14YmDB85tfDEsU1+YRHd3n71lW09evSwFBQUtDku06dPR1HRWY+PP//0q6GDBi8ZnZm5V6fTMbbvsOOPBXQMpdTVNzq6KnW07u62YhFrIpAdrhv9n7DU5C3eMVF0yoIFWWnjxq2JycoqKq2vd4M1WXg1twwAFi1aFDBo0KDz/fr1SwaA1NRU5R+1yhUVFY4tWaPTp0/7FhUVOQLApk2b/Ar3F8btKtwVvWPHjpwXXn71zvc/+SSicP/+uNzcXBfrgnIpLCzswfM8nnrqqf5fffVVhvV11c0cYhs5ERgYGO/t7X0hPT3dv40xZlmGQVRm+oHglJQFADBywrjF85Yvn+4bGdWQOnq0r3UimLZcXwAITUpa7R8be8yaw2FgTwzeHMZp+Lhx44MSkmjBod3d0dzy2WZwyBKCCbNmLUgaq9vpr40rX7RoUd/rBZS2CdTr9b6BgYFntFrtXIVCAQDcn6U3WwnlbxZEfn5+Bxvd2uJ9zG+JJYKysjKH39xvbq6N9iV/MPtMbKREXFzc7KCgoAszZ870bYtRsr02LCVlpa829uJrH30USgDopk6dFpc5/ER+fr6qrWDbNrb3P6b3DoiPp/Pvuy8GALmdCkb/ziA6nY6llKpCExL2RA/P+C/P89ditDgA7H1PPtljUEQkHTt73uzfaURrmUNbE5mZmek2aNCgwsDAwCdtOxj+2clstSECaS2wrRe5jRr+X8SJtmchhCAmJubfAwcOPDRnzpxeV3O7rffAtMhPOSZmZ2/w1cbQwITEs8Fx8aUzFtwZbh0npg0txykVCvjHxxUm6sZ8Q9pXKWBHe2FbSPOWL+8TFBdP9U88Mcn6+lU1HSEEWePHfZSi0228ikZkWqhxpq3FQyllBw0a9JWfn983q1evdv1f0cA3sJPIzRCUK1ajqKhI4e/vvzYkJGRLdXW1SzuUwBUrp1apMHbOnNjMKVNmfZmf3+Fa92cb+3Fz7rjXPyZGsL7/r07M/gNcLb2eIwBGTpnyxLCUFDNt5XK01sRr3nlnUFFRUQ+b9rMKGcuxLKJTM6ZOnL0g8BpuFwMACoUCCQkJj3p7ex8KDw+Pb/3/vxNaLv6MjIzEoUOHHvD393/I1kDWehxsf+dMm5Wy+H69r80SXEuBtfE6efrppz19tVp5yqJFs26GNbaj7YCdpZQqA+MT9kdkpOVSStnc3FzH9mpflmGQMlb3TGBSEo3JyCp/9pVX+l0jsCQ2d2PatGnxPj4+hUFBQS9QSjmWZbFo0SLlzSq9+Ausr80q8kFBQS8OHTr0l9GjRye0EHbyu2f39lYAYEdOnfpscFKi5a1PPkkDgNz8XEdbJr1VAvFqiopTKpQYlpy8LzYj80elUml3rf4KV+s+vb6Xn1ZL5953111tBZW28vYWvnOn+OxRb4cmJNLXPv0wMjQx+e649Iy919vIwXbtwsJC3s/Pb7Wvr+/OESNGjFWprpBJ7O1oUVoKBsdxSEtLG+3v778vMDDwLUqpxhozcNfyp1iGAccwyJ48eW5kWtqlV955J5Vj2fZlz7VajuM4jJ4589nAhISGwsJCN1grG+wr+S9gtRKzs8f7REXSZ996zY8Q0takEb1ez9Aq6qSbMWP7oIiI00tWrAi0xRhBCfEVo6ZP73M9hssmAAzDYNSoUTHBwcE/DR069L/JyckRLMv+hky4xb617R6u3O+ECRMiY2NjfwwMDNyckpIS3eL0LqYNK41Hn320a8yIzE1B8fEfBWqj14yZOv3f/olJBwdHR9Gxs2ZlknYwggQEd614MCM4OYnOWLoozu5a/cVCwjAMItLS3wpJTam25gaupp0IAHL69GmXwPjYothRIz5uXhkEY+6YMd8/Id78/PPPW4NMSoBrFuFdCXBVKhV0Ot28sLCwXSEhIZ+Hh4fHtNoMgv0LhcV2z1fum2EYZGRkREdERKwdNmzYz2lpabM0Gk1Llo9cVZFY804bNmzoFJGR8c3gqBg6auq0r6MyMr/wj43/OjgpdW9IcspzDCFt5jtsc7Bjx46uAfEJom7GrCeY26Dv5p8GAoCjlLIBsXF748eM3mkr0b6akOTm5rJnz57tEJ6afFA7auQW7cjsH4ZERdFxM2ffdQ3rcy3XxdY/T4KCgsYMHDjw25CQkPzIyMiZer2+Q6uPsFqtltO3kaT8I8+u1+sZ64JrTcl2iIyMnBkYGLjOz89v3YgRI2a1KjJk2jGuBACcHB0xZdGiT4alpe+jlDoBQIsq42sycpRSPiw19Xhqzrh8ZXMu6ZZ3bv5j45GioiJP34T4mtEzZr6n4Pmrug62RUIpVcWPGaXXjhr5rm7KlFDGyt230Jwui5YvT25PDqKlpbH6+GkhISGf+Pv7/xwREfFJbGzs2OXLl7te5UBSW/DPabVaTqfTsbYfWBOgLf5mrYLwO2EAmvMYy5cvd01ISBgbHh7+oa+v78+BgYGfpKSkZLRw/a7r2vz7/X877Nixo6v1pN6WcRvJnjLtw/DEpKYnn312KACmLUtAfyVRSFhy8hcRGZkllFJn22v2FXsLqcsZixcP8dVq5UnzFt5LKeUXLVqkbIvJulpsAYBjCIE2K+vzyIyMUtvugu04bRctXSlCCO6++27PmJiY+UOHDv3c399/h6+v79qYmJgHRo4cGa/X6z1bLtwbBcdxmD9/vmdSUlJ8SEjIsqCgoLX+/v47/Pz8Pvf19Z0xdepUzxb3fD138cr4PfTIY4visrKMGw8e9GhJcAAgCp7HqAkTZt/5r38NvlasFhQUxHMsi5QxOc95R0XVPvrcc17XYAj/Vq7K3z4eKSgoECfPn59+vvTid0G+Q5c+/8gjL3jrdIojeXmti/eIVqtlC9B8OEteXp6ky9WxX4z9XMq54465B4qKXpo3b1qfOyfPvvDF+vXup0+e7HLfokUHqCwTXKdK1lr0CFhL7AkheOihhzpu3rw5VBCECEmShgiC0EkQBItKpaoXBOGUu7t7fVlZ2dmePXuiW7du+Oabb057enqq/f39u5w6dYqePXuWGThw4ODy8nJOoVD0l2XZXRAEWa1WV3Mcd1ChUOwMDAzc/cILL1S3qKZldTod2lE+fsX1opSqw9Mz8kVJZPesXx9NCDFTSuUWpezXLCa0VT9njB//YGl5xcNTx+Zol86du0WXm8vm/Y9OH7bjBoWEZVlMmj9/mk9UFB0Wn5xkm7j2uGlrPvkkIjApgQYmJZRlTZiwgFLKhSQlbcgcN35ny3bQdrS92oTwqi7R1KlTVUlJSUNSU1NHhoSEzE1MTHyxV69ez3Xu3Pm5Hj16PKdQKPQODg4Pd+vW7TlXV9fnvLy8nktMTHwpJCRkbmpq6sjU1FRvvV5/tWLF65ICLeu2Wro8tuehlLqFpqc1xWZlv8EyzG/yFTqdjm2zqDAoiCcARk6aurh/6DAxJjsznOM4e1B+G4IDgKyJk2d4R0TS5FE52bbXr+YD0yuVwrWukRnptQHxiR9+9PlH/ZNzdHtisrIL/ePiDHc/8kjfFsEtaSGRXDv96isJNdzc1gLWFr/cqBdQWlqqSR0zeu/YWdOibQH/lfNT/v3vYaHJKXT4pEkLCSHXi11IUFAQzxCCkZOnLhqWlk6XPfTQeGt7tJ3OvR1hsxi6WbPuCEhIoOPmzLmDb7YA7NWKAQGghtZ0mLt06V365s0b8Piat4Z5R0fTxfffN6F1jDFlyszQ51953d/KzPyRPZyutABrtVquRQB+zd9twvAHixdJbm4um19YOIhSqoRWy4WkJH0akpJ8sOX2QldK/u+/b8FwnW4quQaVa8uSA0BkRsaSwMQketdDD01W8DzaiP/suJ2EhGUYzLjzzmkB8fE0Y+yE+9TNWe/rloUvf/zxTt6RkbUhKcnP2a5lszT5+/d3GBQRWRaWltaQNWHC81bq87YqurPRv61oZbJ161bXmMzh9SOnTMliALzwxhsLfRMTaMrY0SNasVxMe74DAHiOQ3xW9r8HhoUJE2bPjrNZNvsK/Ju4WyzDYMKM2TFDo2OM6ZMmvHtlk7VWbgOllMxu3mKHLL7/fo+RU6Y9Qym9oq11Oh3LEIKR06c+65+YWK1/4QVfv1jtjsQxI7+00sS39aLQ6XQsIQS+MTHPh6Qkl4yaNu216PT0PcOS098ITEm6dL621rWl8mhBMV/tYraaLk308OFr/WLj6p96aXW0PRH4Nw3cAUD/4r+9fRMSKmOzs3dWWRNeN7DFjy0foBwSHdU4btasfwHA/Ace6RmalGR55c03e16L+mwd7/zZ7rlrbbdDCEHhkSNe0ZmZz/jHRH0+e/HCSUBzFbT1GZwGR0ebo7OzC3mOg1KhQGhKSmXymDFt1rO1Hk9CCL7dsKFPcErywZC0tPKnn37asz2fteM2F5Lt27e7R2dk7fBPTLiw4tFHg23uwFVcLtLSwtg+H6TVrhyWklLlYC3XmHLnnVm+sbGWLVu2dL6ugPz+f1dNZLaMNdrhS7VutCKUUlVs1oiiuFGjftHdccfdU+bMCbUlPG3XTB47drZvrLbu9ddf7waAeer51QNnL1ni1UIZtOVSsQAwb+k9cSEpqebw9IwfKaWdCOz1VX97tGiAUiTnjH3FVxtjGjVj2p1WtuV62o+hlHIjJ07MjcjIqJk4f/6/J86dO9UvNs6YOWHyx9d1sX7N4Gv6env3e+KJJ1zbsFLXe40AwOrVq91Xr14ddLXnGzt3bubQ6JiatnrW9Xo9w7IsojMy9k+eNeuO9rJlQHNfTMzw4ff6aWPErElTnnF0cGhL+O34O8Km4VmGwdTFC8b5xsYYgxLjv/1261bbgm0zv2Hb6C1FpwuPysj4IjgpaWfmxMlPUUo1uAarZFu40xcvjgpJSioNT04+Ep2ZUTlu1oyHW7hKNgFy1c2aNTdhZNZTSx94IFXZXPP0G1oZABJHjlwTEB9Pn3p+9cAr1sG61ejMZffofGNiqymlDgCgVCpw7tw5L7Rq86WUOth64NtixWxtthzHIffr3H4hSUlbA+PjK2fduyzFtsulvWz9/xls1CQhBG9+kDswNCFxe2BCYv3CB1cstlLBNmtCrheUtDN2YSilnI826syIGTO+p5Q6PPj00yMnzJoxt0WBJCmj1CEue+T+4KSk46njx/4UmphoyZ469YFWeQiGUkpCU1MK0iZNOh+RkryRUspbe/VtLlaH6IzMxoj09Dz9yy8PCE1MXDJy4uRfrOQEuYExYgFAqVBgwvy5dw1LTRW16RnfFxYWutiZqn8GWABwdHBA9uTJywJj40xRmRkbXnnjjX6tY4+WC6eFL87gOgV4Nu165z3/Gjg0Ic6y+LHHPNqKj9J1usWhqalmSqkDSxhkTJusC4hLEDds+LlTS0u07Jln3PwT4ou/3rjR1z8u9vLYmbPn2f5v+77HXnklISgx4bA2M6M+Iil597IVD6a07nlv476vCAYBsOJRvX9IcuK2gJiYmntWrlzq6Oj4G6toxz/A5Vr04iIlAfDJ99/3jcnMXDckOqoxLjv7sZY+/B/t6bAt2Eefe87LOzzKMve+B+KVCv43RsgmIHGZmW+Gp6VvtVUif7Xtxy7+sfHG+/WP+QKAlYLGuBmzg4doY8SEkaM2DktOLvKJirr81uef94GtD8a68BU8j3dzc7vyPH9do2cjBwBAo1bDYDB0iRo+/JWA+Hhzck7OVz/s2NHRGmdx9orcf7A1YRkGWRMnZoSmplwIjE8oyZ4yZWGLlto2twm6HjnAMgwyx09+U5s9isaNGPla6hjd53fr9Z5WIeIAIGnUqOHBiUn0+Xfe8deo1ciYMunpYSmpTbYmMNsxCGFpafeHJCefXfbwwwGUUtesCRMPZU+a9HBLYWsdF7Sl8a/Qzr/+rcieNEkfmpRU7xsTUzj3rrviOYaF3aWyo/WmBk4jZ0y7LzIzs9FPqz2izc6eRCltWTrBttfNaNk8NGXh4kna4SPeGj5hwr25ublq/JqYIwqFAjmzZ68dlpLaoM3MPD4sMaHivscem8Bae79t3zd6ypS7syaMu6PF9ZVr1qzRXM1dasuNavmsPMuCUtoxabRucXB8fElAfNyZnOnTpzv82nlob3Ky4+rallLqnDll0sMhyYlVwUlJF6JHjFjywfffO7eOIW4Wk6NRa3C3/jFfbWZm1IYNG1yu5RrdaGdii+5DAADHsnj23Xe7po4b9+ywpOS6oMSEs8ljx85rcZybfWMFO67P4lj/VkWkps4LTkk65R0TfUk7PPvDJ19+OclWrNhCWriWccDv/Hy9nsOvxYk3JKytmbHWFuoqD9FMIf+eaGAWLX8gOVGXs8knVmsITkk+Mnb27NmUUtb2PPYg/A+zlv88QSE5OQysTUcqpRKJo0enXSgvX8AxJF6SabGDxvGTEH/fta89/fQhk+U3fVmsVqsl7u7uNDc3V27vcQQ2rb1y5Up6I0cYUEpJTk4OYz0TRUaL5ialQoE77r3X7+ef94xiWHqHaBFcZIb9qU/Xrs9+++mnm81m868xVl6ejNv0CAK7gNzG46PT6Rhbdx4B8NCTT3b7+ZdDM6ouVeYQKg+QCXPGtUOHHzo5O+d99uabezmGNUn0dw14rFarJQDg7u5Ovb296apVq6h1gTd/USuhoJQSax8v9Ho9AYAjR46QSuvhnlc7IIhjWQiiqJm9dGnE2dKyrLqGuiTIUldBlIrcO7p9MiFnzNpZ48eXUkohyXJzd2XzAal2wbALyE0RFNgWpYLnsWjFCu8Tp87kVFZVZBhNpr4cr4CDs8PBjs4dtro6Om5JHz587+QRI6otZnN7VmBLv19uz8TxCgWefOtlrw3f5Q8xWUyxDU2maIjSEIaAsYjizk4d3dZFhQR99ej99xdLv7bktvc0KDvsAvLH3K/Y2NjfaF6OYfDx9993/PK/36VVVZUnX750aRDLcwMBKnNgqhmeO8+w3BFQekiSpGMJ0dEN548cKfYfPrxpmU5HAIiEEAuxXlClVMJoMqkBkPDwHDpibITHyZIS16ry8h5NRmNXSZb9Gw2GvgS0h0xIZ4ZloFGpzwNka/fu3dfftWzZ1sDevWtbSACj1WqZzZs3S3/iBCq7gNhxY9Dr9czmzZuZ1r4/Qwh2HD/u/OZrr3kXl5YONjQYhjaYmwZwHNdfMBnVGo1jx7q6ukZHBwcVx3EQBdF8sbz8nFqlJqIkUrVa7drJtaO72WKGIAgwWyySRqNSCoLQoFCp6mWZnnRxdj7BUGZ3z66eR99++eWzCp6vF0Txd25dbGysvOo65zraYReQv8Sy5OTkMHmVlQStBKZVjMAtvP9+F5nj3GE2u6/buJFWVVYzzk5qhWhd4BaLReIZhdi7f28aFRVF9h3Zd35I78ENrzzxRC3PcZIoSW25aIxOp7shcsAOu4DcMoFZuXIl2bx5M2MNqm3xC70Jc8ZqtdorAf+NMl922AXkth5zSilWrlxJjhw5QgCgOfbP++27dDrorL/meXtTrFxJ0cxr2QXBDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDDDjvssMMOO+ywww477LDj74P/AzNsuPUvWwGpAAAAAElFTkSuQmCC";

// ============================================================
// DONUT CHART COMPONENT
// ============================================================
const DonutChart = ({ percentage, size = 90, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  const getColor = (pct) => {
    if (pct >= 75) return "#5E8C6A";
    if (pct >= 40) return "#483428";
    return "#483428";
  };

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E8E5E0" strokeWidth={strokeWidth} />
        <circle
          cx={center} cy={center} r={radius} fill="none"
          stroke={getColor(percentage)} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "#1A1A1A"
      }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

// ============================================================
// EDITABLE TEXT COMPONENT
// ============================================================
const EditableText = ({ value, onChange, placeholder, style = {}, multiline = false, autoResize = false }) => {
  const Tag = multiline || autoResize ? "textarea" : "input";
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <Tag
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={autoResize ? 1 : undefined}
      style={{
        background: "transparent", border: "none", outline: "none", width: "100%",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1A1A1A",
        resize: multiline && !autoResize ? "vertical" : "none",
        minHeight: multiline && !autoResize ? 60 : "auto",
        padding: "4px 0",
        overflow: autoResize ? "hidden" : "auto",
        ...style,
      }}
    />
  );
};

// ============================================================
// ACTION ITEM ROW
// ============================================================
const ActionItem = ({ action, onUpdate, onDelete }) => {
  return (
    <div style={{
      padding: "10px 0",
      borderBottom: "1px solid #E8E5E0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => onUpdate({ ...action, done: !action.done })}
          style={{
            width: 22, height: 22, borderRadius: 6, border: `2px solid ${action.done ? "#5E8C6A" : "#6B6B6B"}`,
            background: action.done ? "#5E8C6A" : "transparent", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0,
          }}
        >
          {action.done && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        
        <div style={{ flex: 1, minWidth: 200 }}>
          <EditableText
            value={action.text}
            onChange={(text) => onUpdate({ ...action, text })}
            placeholder="Action step..."
            autoResize={true}
            style={{
              textDecoration: action.done ? "line-through" : "none",
              color: action.done ? "#A89F91" : "#1A1A1A",
              width: "100%",
            }}
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <input
            type="date"
            value={action.dueDate || ""}
            onChange={(e) => onUpdate({ ...action, dueDate: e.target.value })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6B6B6B",
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 6px",
              background: "#FDFCFA", width: 110,
            }}
          />
          <select
            value={action.status || "todo"}
            onChange={(e) => onUpdate({ ...action, status: e.target.value })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 8px",
              background: action.status === "done" ? "#E8F5E8" : action.status === "in-progress" ? "#FFF3E0" : "#FDFCFA",
              color: "#1A1A1A", width: 95,
            }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          onClick={onDelete}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "#6B6B6B", fontSize: 16, lineHeight: 1, flexShrink: 0,
          }}
          title="Remove"
        >×</button>
      </div>
    </div>
  );
};

// ============================================================
// GOAL CARD COMPONENT
// ============================================================
const GoalCard = ({ goal, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const totalActions = goal.actions.length;
  const doneActions = goal.actions.filter((a) => a.done).length;
  const percentage = totalActions === 0 ? 0 : (doneActions / totalActions) * 100;

  const addAction = () => {
    const today = new Date().toISOString().split("T")[0];
    onUpdate({
      ...goal,
      actions: [...goal.actions, { id: generateId(), text: "", done: false, dueDate: today, status: "todo" }],
    });
  };

  const updateAction = (idx, updated) => {
    const newActions = [...goal.actions];
    newActions[idx] = updated;
    if (updated.done) updated.status = "done";
    if (!updated.done && updated.status === "done") updated.status = "in-progress";
    onUpdate({ ...goal, actions: newActions });
  };

  const deleteAction = (idx) => {
    onUpdate({ ...goal, actions: goal.actions.filter((_, i) => i !== idx) });
  };

  return (
    <div style={{
      background: goal.completed ? "#FFFFFF" : "#FFFFFF",
      borderRadius: goal.completed ? 12 : 16,
      border: goal.completed ? "1px solid #E8E5E0" : "1px solid #E8E5E0",
      overflow: "hidden",
      boxShadow: goal.completed ? "none" : "0 1px 3px rgba(61,53,41,0.04)",
      opacity: goal.completed ? 0.7 : 1,
      transform: goal.completed ? "scale(0.97)" : "scale(1)",
      transition: "all 0.2s ease",
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: goal.completed ? "14px 18px" : "20px 24px", cursor: "pointer", gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 8, height: 40, borderRadius: 4, flexShrink: 0,
            background: percentage >= 75 ? "#5E8C6A" : percentage >= 40 ? "#483428" : "#483428",
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: goal.completed ? 14 : 17, fontWeight: 700,
              color: "#1A1A1A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {goal.title || "Untitled Goal"}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", marginTop: 2,
            }}>
              {doneActions}/{totalActions} actions complete
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <DonutChart percentage={percentage} size={56} strokeWidth={7} />
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ padding: "0 24px 24px", borderTop: "1px solid #E8E5E0" }}>
          {/* Goal Title & Why */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Goal
              </label>
              <EditableText
                value={goal.title}
                onChange={(title) => onUpdate({ ...goal, title })}
                placeholder="What's the goal?"
                autoResize
                style={{ fontSize: 15, fontWeight: 600 }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Why This Matters
              </label>
              <EditableText
                value={goal.why}
                onChange={(why) => onUpdate({ ...goal, why })}
                placeholder="Connect it to the North Star..."
                autoResize
                style={{ fontSize: 14 }}
              />
            </div>
          </div>

          {/* Challenges */}
          <div style={{ marginTop: 16 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Challenges
            </label>
            <EditableText
              value={goal.challenges}
              onChange={(challenges) => onUpdate({ ...goal, challenges })}
              placeholder="What obstacles are in the way?"
              autoResize
              style={{ fontSize: 14 }}
            />
          </div>

          {/* Action Steps */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Action Steps
              </label>
              <button
                onClick={addAction}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                  color: "#5E8C6A", background: "#E8F5F0", border: "none", borderRadius: 8,
                  padding: "5px 12px", cursor: "pointer",
                }}
              >
                + Add Step
              </button>
            </div>
            {goal.actions.length === 0 ? (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", padding: "12px 0", fontStyle: "italic" }}>
                No action steps yet. Click "+ Add Step" to get started.
              </div>
            ) : (
              <>
                {goal.actions.map((action, idx) => ({ action, idx })).filter(item => !item.action.done).map(({ action, idx }) => (
                  <ActionItem
                    key={action.id}
                    action={action}
                    onUpdate={(updated) => updateAction(idx, updated)}
                    onDelete={() => deleteAction(idx)}
                  />
                ))}
                
                {goal.actions.some(a => a.done) && (
                  <div style={{ marginTop: 12 }}>
                    <button
                      onClick={() => setShowCompleted(!showCompleted)}
                      style={{
                        background: "none", border: "none", padding: "8px 0", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#6B6B6B",
                      }}
                    >
                      <svg
                        width="12" height="12" viewBox="0 0 20 20" fill="none"
                        style={{ transform: showCompleted ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                      >
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {showCompleted ? "Hide" : "Show"} Completed Action Steps ({goal.actions.filter(a => a.done).length})
                    </button>
                    
                    {showCompleted && (
                      <div style={{ marginTop: 8, opacity: 0.8 }}>
                        {goal.actions.map((action, idx) => ({ action, idx })).filter(item => item.action.done).map(({ action, idx }) => (
                          <ActionItem
                            key={action.id}
                            action={action}
                            onUpdate={(updated) => updateAction(idx, updated)}
                            onDelete={() => deleteAction(idx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Goal Notes */}
          <div style={{ marginTop: 20 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Goal Notes
            </label>
            <EditableText
              value={goal.notes}
              onChange={(notes) => onUpdate({ ...goal, notes })}
              placeholder="Observations, context, session insights for this goal..."
              multiline
              style={{ fontSize: 13, background: "#FFFFFF", borderRadius: 8, padding: 12, marginTop: 6, border: "1px solid #E8E5E0" }}
            />
          </div>

          {/* Goal Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
            <button
              onClick={() => onUpdate({ ...goal, completed: !goal.completed })}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: goal.completed ? "#483428" : "#5E8C6A",
                background: goal.completed ? "#F4EFEB" : "#E8F5F0",
                border: "none", borderRadius: 8, padding: "5px 14px", cursor: "pointer",
              }}
            >
              {goal.completed ? "↩ Reopen Goal" : "✓ Complete Goal"}
            </button>
            <button
              onClick={onDelete}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#483428",
                background: "none", border: "1px solid #E8E5E0", borderRadius: 8,
                padding: "5px 14px", cursor: "pointer",
              }}
            >
              Remove Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// STRENGTH ITEM
// ============================================================
const StrengthItem = ({ strength, onUpdate, onDelete }) => {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
      background: "#FFFFFF", borderRadius: 10, border: "1px solid #E8E5E0",
    }}>
      <span style={{ color: "#483428", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✦</span>
      <EditableText
        value={strength.text}
        onChange={(text) => onUpdate({ ...strength, text })}
        placeholder="A strength, skill, or quality you bring to the table..."
        style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}
      />
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: 14, padding: 2, flexShrink: 0 }}>×</button>
    </div>
  );
};

// ============================================================
// STRATEGY ITEM
// ============================================================
const StrategyItem = ({ strategy, onUpdate, onDelete }) => {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
      background: "#FFFFFF", borderRadius: 10, border: "1px solid #E8E5E0",
    }}>
      <span style={{ color: "#483428", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✦</span>
      <EditableText
        value={strategy.text}
        onChange={(text) => onUpdate({ ...strategy, text })}
        placeholder="Add a strategy or technique that's been helpful..."
        style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}
      />
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: 14, padding: 2, flexShrink: 0 }}>×</button>
    </div>
  );
};

// ============================================================
// SESSION NOTE
// ============================================================
const SessionNote = ({ session, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8E5E0", overflow: "hidden",
    }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="date"
            value={session.date || ""}
            onChange={(e) => { e.stopPropagation(); onUpdate({ ...session, date: e.target.value }); }}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A",
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 8px", background: "white",
            }}
          />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6B6B6B" }}>
            {session.title || "Session notes..."}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {expanded && (
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Session Title
            </label>
            <EditableText
              value={session.title}
              onChange={(title) => onUpdate({ ...session, title })}
              placeholder="Quick summary of this session..."
              style={{ fontSize: 14, fontWeight: 600 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Key Takeaways
            </label>
            <EditableText
              value={session.takeaways}
              onChange={(takeaways) => onUpdate({ ...session, takeaways })}
              placeholder="What were the breakthroughs or insights?"
              multiline
              style={{ fontSize: 13, background: "white", borderRadius: 8, padding: 10, marginTop: 4, border: "1px solid #E8E5E0" }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Action Items for Next Week
            </label>
            <EditableText
              value={session.nextSteps}
              onChange={(nextSteps) => onUpdate({ ...session, nextSteps })}
              placeholder="What do you commit to doing before next session?"
              multiline
              style={{ fontSize: 13, background: "white", borderRadius: 8, padding: 10, marginTop: 4, border: "1px solid #E8E5E0" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={onDelete} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#483428", background: "none", border: "1px solid #E8E5E0", borderRadius: 8, padding: "4px 12px", cursor: "pointer" }}>
              Remove Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================
const SectionHeader = ({ icon, title, action, collapsed, onToggle, count }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: collapsed ? 8 : 16, marginTop: 40, cursor: "pointer" }} onClick={onToggle}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
        {title}
      </h2>
      {count !== undefined && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", background: "#E8E5E0", borderRadius: 12, padding: "2px 10px" }}>
          {count}
        </span>
      )}
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", marginLeft: 4 }}>
        <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div onClick={(e) => e.stopPropagation()}>
      {action}
    </div>
  </div>
);
// ============================================================
// MAIN APP
// ============================================================
export default function CoachingTracker({ data, onUpdate }) {
  const [collapsed, setCollapsed] = useState({
    goals: false,
    completedGoals: true,
    strengths: false,
    strategies: false,
    sessions: false,
  });

  const update = (field, value) => onUpdate({ ...data, [field]: value });
  const toggleSection = (section) => setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));

  // Goals
  const addGoal = () => {
    update("goals", [
      ...data.goals,
      { id: generateId(), title: "", why: "", challenges: "", notes: "", actions: [], completed: false },
    ]);
  };

  const updateGoal = (idx, updated) => {
    const g = [...data.goals];
    g[idx] = updated;
    update("goals", g);
  };

  const deleteGoal = (idx) => update("goals", data.goals.filter((_, i) => i !== idx));

  // Strengths
  const addStrength = () => update("strengths", [...data.strengths, { id: generateId(), text: "" }]);
  const updateStrength = (idx, updated) => { const s = [...data.strengths]; s[idx] = updated; update("strengths", s); };
  const deleteStrength = (idx) => update("strengths", data.strengths.filter((_, i) => i !== idx));

  // Strategies
  const addStrategy = () => update("strategies", [...data.strategies, { id: generateId(), text: "" }]);
  const updateStrategy = (idx, updated) => { const s = [...data.strategies]; s[idx] = updated; update("strategies", s); };
  const deleteStrategy = (idx) => update("strategies", data.strategies.filter((_, i) => i !== idx));

  // Sessions
  const addSession = () => {
    const today = new Date().toISOString().split("T")[0];
    update("sessions", [{ id: generateId(), date: today, title: "", takeaways: "", nextSteps: "" }, ...data.sessions]);
  };
  const updateSession = (idx, updated) => { const s = [...data.sessions]; s[idx] = updated; update("sessions", s); };
  const deleteSession = (idx) => update("sessions", data.sessions.filter((_, i) => i !== idx));

  // Overall progress
  const totalActions = data.goals.reduce((sum, g) => sum + g.actions.length, 0);
  const doneActions = data.goals.reduce((sum, g) => sum + g.actions.filter((a) => a.done).length, 0);
  const overallPct = totalActions === 0 ? 0 : (doneActions / totalActions) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#F9F7F3", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header Section Card */}
      <div style={{
        background: "transparent",
        padding: "32px 24px 28px", color: "#1A1A1A",
      }}>
        <div style={{ 
          maxWidth: 800, margin: "0 auto", 
          background: "rgba(94, 140, 106, 0.15)", border: "1px solid rgba(94, 140, 106, 0.3)", borderRadius: 20,
          padding: "32px"
        }}>
          {/* Avatar / Name / Date */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(94, 140, 106, 0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => onUpdate({ ...data, showSymbolPicker: !data.showSymbolPicker })}
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: data.avatarSymbol ? 26 : 22,
                    fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#5E8C6A",
                    cursor: "pointer", border: "1px solid rgba(94, 140, 106, 0.2)",
                  }}
                >
                  {data.avatarSymbol || data.clientInitial || "?"}
                </div>
                {data.showSymbolPicker && (
                  <div style={{
                    position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)",
                    background: "#1A1A1A", borderRadius: 12, padding: "12px 14px",
                    display: "flex", gap: 6, flexWrap: "wrap", width: 200, justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    {SYMBOLS.map(symbol => (
                      <div
                        key={symbol}
                        onClick={(e) => { e.stopPropagation(); onUpdate({ ...data, avatarSymbol: symbol, showSymbolPicker: false }); }}
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20, cursor: "pointer",
                          background: data.avatarSymbol === symbol ? "rgba(255,255,255,0.2)" : "transparent",
                          border: data.avatarSymbol === symbol ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent",
                          transition: "transform 0.15s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        {symbol}
                      </div>
                    ))}
                    <div
                      onClick={(e) => { e.stopPropagation(); onUpdate({ ...data, avatarSymbol: "", showSymbolPicker: false }); }}
                      style={{
                        width: 36, height: 36, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, cursor: "pointer", color: "rgba(255,255,255,0.5)",
                        border: "2px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      clear
                    </div>
                  </div>
                )}
              </div>
              <div>
                <EditableText
                  value={data.clientName}
                  onChange={(v) => update("clientName", v)}
                  placeholder="Client Name"
                  style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", fontFamily: "'Playfair Display', serif" }}
                />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#6B6B6B", marginBottom: 4 }}>Start Date</div>
              <input
                type="date"
                value={data.startDate || ""}
                onChange={(e) => update("startDate", e.target.value)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A1A1A",
                  background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(94, 140, 106, 0.2)",
                  borderRadius: 6, padding: "4px 8px",
                }}
              />
            </div>
          </div>

          {/* North Star */}
          <div style={{
            background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(94, 140, 106, 0.2)", borderRadius: 12, padding: "20px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16, color: "#5E8C6A" }}>✦</span>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#5E8C6A" }}>
                North Star
              </span>
            </div>
            <EditableText
              value={data.northStar}
              onChange={(v) => update("northStar", v)}
              placeholder="What's the big vision? What version of yourself do you want to see by the end of your coaching journey?"
              multiline
              style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.6, minHeight: 50, fontWeight: 500 }}
            />
          </div>

          {/* Overall Progress Bar */}
          {totalActions > 0 && (
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ flex: 1, height: 6, background: "rgba(72,52,40,0.1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  width: `${overallPct}%`, height: "100%", borderRadius: 3,
                  background: "#5E8C6A",
                  transition: "width 0.4s ease",
                }} />
              </div>
              <span style={{ fontSize: 13, color: "#6B6B6B", whiteSpace: "nowrap" }}>
                {doneActions}/{totalActions} actions
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Goals Section */}
        {(() => {
          const activeGoals = data.goals.filter(g => !g.completed);
          const completedGoals = data.goals.filter(g => g.completed);
          return (
            <>
              <SectionHeader
                icon="🎯"
                title="Goals"
                collapsed={collapsed.goals}
                onToggle={() => toggleSection('goals')}
                count={activeGoals.length}
                action={
                  <button onClick={addGoal} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                    color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
                    padding: "8px 18px", cursor: "pointer",
                  }}>
                    + Add Goal
                  </button>
                }
              />
              {!collapsed.goals && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {activeGoals.length === 0 && completedGoals.length === 0 ? (
                    <div style={{
                      textAlign: "center", padding: "40px 20px", background: "white",
                      borderRadius: 16, border: "2px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
                    }}>
                      No goals yet. Click "+ Add Goal" to start building the roadmap.
                    </div>
                  ) : (
                    activeGoals.map((goal) => {
                      const realIdx = data.goals.indexOf(goal);
                      return (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          onUpdate={(updated) => updateGoal(realIdx, updated)}
                          onDelete={() => deleteGoal(realIdx)}
                        />
                      );
                    })
                  )}
                </div>
              )}
              {completedGoals.length > 0 && (
                <>
                  <SectionHeader
                    icon="✅"
                    title="Completed Goals"
                    collapsed={collapsed.completedGoals}
                    onToggle={() => toggleSection('completedGoals')}
                    count={completedGoals.length}
                  />
                  {!collapsed.completedGoals && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {completedGoals.map((goal) => {
                        const realIdx = data.goals.indexOf(goal);
                        return (
                          <GoalCard
                            key={goal.id}
                            goal={goal}
                            onUpdate={(updated) => updateGoal(realIdx, updated)}
                            onDelete={() => deleteGoal(realIdx)}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          );
        })()}

        {/* Session Log */}
        <SectionHeader
          icon="📝"
          title="Session Log"
          collapsed={collapsed.sessions}
          onToggle={() => toggleSection('sessions')}
          count={data.sessions.length}
          action={
            <button onClick={addSession} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Log Session
            </button>
          }
        />
        {!collapsed.sessions && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.sessions.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                Session notes will appear here. Log insights and action items after each session.
              </div>
            ) : (
              data.sessions.map((s, idx) => (
                <SessionNote
                  key={s.id}
                  session={s}
                  onUpdate={(u) => updateSession(idx, u)}
                  onDelete={() => deleteSession(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Strategies Bank */}
        <SectionHeader
          icon="💡"
          title="Strategies That Work"
          collapsed={collapsed.strategies}
          onToggle={() => toggleSection('strategies')}
          count={data.strategies.length}
          action={
            <button onClick={addStrategy} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Add Strategy
            </button>
          }
        />
        {!collapsed.strategies && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.strategies.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                A running list of what works for you so you can refer back later.
              </div>
            ) : (
              data.strategies.map((s, idx) => (
                <StrategyItem
                  key={s.id}
                  strategy={s}
                  onUpdate={(u) => updateStrategy(idx, u)}
                  onDelete={() => deleteStrategy(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Strengths Section */}
        <SectionHeader
          icon="💪🏻"
          title="My Strengths"
          collapsed={collapsed.strengths}
          onToggle={() => toggleSection('strengths')}
          count={data.strengths.length}
          action={
            <button onClick={addStrength} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Add Strength
            </button>
          }
        />
        {!collapsed.strengths && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.strengths.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                Recognize and track your strengths here. These can be utilized to help you overcome challenges you face.
              </div>
            ) : (
              data.strengths.map((s, idx) => (
                <StrengthItem
                  key={s.id}
                  strength={s}
                  onUpdate={(u) => updateStrength(idx, u)}
                  onDelete={() => deleteStrength(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 60, textAlign: "center", padding: "24px 0", borderTop: "1px solid #E8E5E0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URI} alt="LG Coaching" style={{ width: 80, height: 80, opacity: 0.6 }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#6B6B6B" }}>
            Liana Groombridge • ADHD Coaching
          </span>
        </div>
      </div>
    </div>
  );
}
