
# Injects

Dependency injection for TypeScript : https://mickgrz.github.io/injects/

## Use case :

Use a class instance without instantiate it.

The responsibility of providing dependency is delegated to an injector.

This separates the responsibilities of usages and construction.

This also improves readability, testability & maintainability.

### Example :

```js
class Dao {
    public create(entity: any) {
        [...]
    }
}
```

```js
import {inject} from 'injects';
import Dao from './Dao';

class Service {

  private dao: Dao;

  constructor() {
    this.dao = inject(Dao);
  }

  public create(entity: any) {
    return this.dao.create(entity);
  }
}
```

```js
const service: Service = new Service();
service.create({ entityId: 1 });// will call dao.create
```

You can also write :

```js
import {inject} from 'injects';
import Dao from './Dao';

class Service {

  private dao: Dao = inject(Dao);

  public create(entity: any) {
    return this.dao.create(entity);
  }
}
```

### Unit test example :

Stubbing dependency is easy :

```js
import {Injectable} from 'injects';
import * as sinon from 'sinon';

Injectable('Dao', sinon.stub());
const service: Service = new Service();// will get stub dependency
service.create({ entityId: 1 });// will call the stub
```

Name of dependency's class is the key used to register the dependency instance.

## Installation :

```
npm install --save injects
```
