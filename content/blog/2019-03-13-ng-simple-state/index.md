---
slug: ng-simple-state
date: 2019-03-13
title: 'The Most Simple State Management Solution for Angular'
description: 'A simple solution for state management in Angular'
published: true
author: 'Jonas Bandi'
banner: './banner.png'
---

> Es könnt' alles so einfach sein, isses aber nicht.  
> -[Die Fantastischen Vier](https://www.youtube.com/watch?v=hoZervGXQyI)

State-management in Angular can be a complicated topic. There is an abundance of
3rd party state management libraries: [NgRx](https://ngrx.io/),
[ngxs](https://ngxs.gitbook.io/ngxs),
[Akita](https://netbasal.gitbook.io/akita/) … to only mention the most popular
ones. These libraries are opinionated and have heavy implications on the
architecture of an application. They imply concepts for separation of concern
and immutability that are not easy to understand and implement.

I have seen a great share of over-engineered Angular applications, where zealous
engineers implemented state management that looks like a fully automated Tesla
Gigafactory … for simple “forms over data” applications. As a consequence I
regularly see teams struggle to extend and maintain these applications once the
zealous engineers switched to the next project.

Yet there is also a desire for simpler state management:

- [The future of JavaScript state management is less state management…](https://medium.com/@amcdnl/the-future-of-javascript-state-management-is-less-state-management-ba1d97b99308)
- [My favorite state management technique in Angular — RxJS Behavior Subjects](https://medium.com/@rmcavin/my-favorite-state-management-technique-in-angular-rxjs-behavior-subjects-49f18daa31a7)

Both articles suggest [observable data services] as a simple alternative to a
full fledged state management library. The official angular documentation also
[suggests a similar design].

The pattern of the observable data service looks similar like this:

```typescript
export class CounterComponent implements OnInit, OnDestroy {
	currentCount: number;

	constructor(private counter: CounterService) { }

	ngOnInit(): void {
	    this.subscription = this.counter.getCount().subscribe(
	      res => {
	        this.currentCount = res.value;
	      });
	  }
```

Yet there is an even simpler and more intuitive way to do state management in
Angular…

> Just use Angular Change Detection!

```typescript
export class CounterComponent {

	constructor(private counter: CounterService) { }

  	get currentCount() {
    	return this.counter.currentCount.value;
  	}
```

Here we just leverage the default change detection of Angular with a stateful
service:

- In templates you can just bind to properties of the service (using getters on
  the component).
- Then you can simply mutate these properties on the service.
- Angular default change detection will do the rest.

I created a [demo project](https://github.com/jbandi/ng-subject-vs-getter)
illustrating the concept by implementing the same simple counter demo from the
post
[My favorite state management technique in Angular — RxJS Behavior Subjects](https://medium.com/@rmcavin/my-favorite-state-management-technique-in-angular-rxjs-behavior-subjects-49f18daa31a7).

I think this is the simplest and most intuitive way to implement state
management. It is a form of
[“transparent reactivity”](https://github.com/meteor/docs/blob/version-NEXT/long-form/tracker-manual.md):

- The state is mutable data
- Any change (mutation) of the state is automatically shown in the UI (the
  framework “reacts” by updating the UI) Angular gives us “transparent
  reactivity” out of the box when we use the default change detection. This
  works with any shape of state. You can use deeply nested state and just mutate
  any desired property. There is no need to implement a concept of “immutable
  state” (which is a paradox in most applications anyway). There is no need to
  model state changes and reactions explicitly via observables and
  subscriptions. No need for RxJS at all!

> The key takeaway: Default Angular change detection enables really simple state
> management!

I wonder why this is not documented more prominently …

Sometimes a simple solution is good enough. You should carefully consider if you
really need `ChangeDetectionStrategy.OnPush` or even RxJS for state-management.
What are the advantages compared to a simpler architecture? What are the
trade-offs for your specific project can you really prove that a more
complicated architecture pays off?

If you are going for a more complicated architecture, make sure that you get
real benefits out of it. If we look at the demo from [My favorite state
management technique in Angular — RxJS Behavior Subjects] I see more
disadvantages than advantages:

- With a Subject-based solutions like this we often have not a single source of
  truth any more: Each component instance that subscribes to the service has its
  own state. These distributed states are programmatically synchronized via
  pub-sub of the Subject (this could be avoided by using the `async` pipe
  instead of subscribing programmatically).
- Moving away from a single source of truth for state-management to distributed
  state opens up the potential for many bugs where the states might diverge
  (i.e. race conditions)
- Moving away from managing a single source of truth to the notion of
  message-passing between components via a service might quickly lead to a
  tangled web of communication paths (remember "scope-soup" of AngularJS)
- Additionally subscribing to Observables comes with the need of unsubscribing
  which is another type of state (typically managed by the component lifecycle).
  When you rely on Angular default change tracking the components can be pure
  and stateless.
