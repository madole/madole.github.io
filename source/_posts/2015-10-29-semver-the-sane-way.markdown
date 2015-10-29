---
layout: post
title: "Semver - The sane way"
date: 2015-10-29 21:33:34 +1100
comments: true
categories: Code
keywords: Semver, Semantic Versioning, modules, code
description: A guide to pain free semantic versioning 
---

> **Semantic Versioning 2.0.0** - http://semver.org
>
> *Summary*
>
> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> MAJOR version when you make incompatible API changes,
>
> MINOR version when you add functionality in a backwards-compatible manner, and
>
> PATCH version when you make backwards-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

### Aim: To avoid dependency hell
If you're dealing with a lot of modules in your application, it becomes incredibly
hard to manage what versions of what packages you are using, which packages to bump
a version so you can take in the latest bug fix, api update or breaking change.

As a project grows and the reliance on modules becomes bigger and bigger, it is very important that you don't accidentally pull in a version of a module that includes a breaking change.

Semantic versioning is a sane way to communicate the changes in a module release.

### How do we achieve this?
There are two angles this problem has to be tackled from.
- The consuming application angle
- The module developer angle


#### From the consuming application's point of view

Semantic versioning provides a clear and easy way to automatically pull in non breaking changes with the ```~``` and ```^``` characters.
Examples include:

```
lodash: ~2.0.0
```

This will pull in all patch versions in the 2.0.* range.

```
lodash: ^2.0.0
```

This will pull in all patch versions and all minor versions in the 2.\*.\* range.


#### From the module developer's point of view
How can we achieve this?

How can we ensure that our code change hasn't caused a breaking change?

We can of course manage this in a manual fashion. This takes the form of asking yourself the following questions:

- Did I change the functionality of public facing API? **Yes**
    - Breaking change -> **MAJOR version bump**


- Did my change add a public API function but not change the functionality of the existing API? **Yes**
    - Non breaking change -> **MINOR version bump**


- Did my change not impact any of the public API functionality but fix a bug with the internals? **Yes**
    -  Non breaking change -> **PATCH version bump**


This is fine, but the issue lies with it's interpretation.

You can not be sure that your code change has not had an impact on the functionality of the public API without exhaustive manual testing.

This is especially true if you are working in a collaborative environment where you might not have in-depth knowledge of the codebase and therefore aren't aware of possible side effects you might be causing. This makes determining the correct versioning of a release almost impossible.

#### Unit testing to the rescue

If you can get your test code coverage up to 100%, you can manage semver releases in a much more sane way.

If you're code has 100% test coverage, semver works like this:

- Did your change break the tests? **MAJOR version bump**
- Did your change add to the API but not break the tests? **MINOR version bump**
- Did your change not add to the API and not break the tests? **PATCH version bump**

**The only time existing tests can be changed is when you're deploying a major version.**

**Tests for only the new API addition need to be added for a minor version deployment.**

**Tests DO NOT change for a patch version deployment**

With this technique, you take the human interpretation (and therefore potential for  human error) out of the equation. Semantic versioning becomes very easy and intuitive.

You can be safe in the knowledge that your changes *will not* break a consuming application's code when they take in the wildcard patch and minor versions.

As far as I can see, this is the only way to implement Semantic Versioning that makes sense.  
