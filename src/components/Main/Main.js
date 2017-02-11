import React from 'react';
import { Link } from 'react-router';

export default function () {
  return (
    <div>
      <div>
        <span>Simple Example module1 -- bundle1 module2 -- bundle2:</span>
        <Link to="simple1"> Module1 </Link>
        <Link to="simple2"> Module2 </Link>
      </div>
      <div>
        <span>Simple Deps Example. Module2 require Module1. module1 -- bundle1/bunlde2 module2 -- bundle2:</span>
        <Link to="simpleDeps1"> Module1 </Link>
        <Link to="simpleDeps2"> Module2 </Link>
      </div>

      <div>
        <div>Recursive Deps Example. Module2 require Module1 and Module1 require Module2</div>
        <span> module1 -- bundle1 module2 -- bundle1: </span>
        <Link to="recursiveDeps1"> Module1 </Link>
        <Link to="recursiveDeps2"> Module2 </Link>
      </div>

      <div>
        <div>Third Party Deps Example. Module1 and Module2 require commonData.js</div>
        <span> module1 -- bundle1 module2 -- bundle2 commonData -- bundle1/bundle2: </span>
        <Link to="thirdPartyDeps1"> Module1 </Link>
        <Link to="thirdPartyDeps2"> Module2 </Link>
      </div>

      <div>
        <div>Common Deps Example. Module1 and Module2 require common/data.js</div>
        <span> module1 -- bundle1 module2 -- bundle2 common/data -- common: </span>
        <Link to="commonDeps1"> Module1 </Link>
        <Link to="commonDeps2"> Module2 </Link>
      </div>
    </div>
  );
}

