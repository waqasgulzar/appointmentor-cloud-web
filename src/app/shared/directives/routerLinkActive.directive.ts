import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, ElementRef, Input, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkWithHref, Router, RouterEvent, NavigationEnd } from '@angular/router';



@Directive({
  selector: '[routerLinkActive]',
  exportAs: 'routerLinkActive',
})
export class RouterLinkActive implements OnChanges,
  OnDestroy, AfterContentInit {
  @ContentChildren(RouterLink, { descendants: true }) links: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, { descendants: true })
  linksWithHrefs: QueryList<RouterLinkWithHref>;

  private classes: string[] = [];
  private subscription: Subscription;
  public readonly isActive: boolean = false;

  @Input() routerLinkActiveOptions: { exact: boolean } = { exact: false };

  constructor(
    private router: Router, private element: ElementRef, private renderer: Renderer2,
    private cdr: ChangeDetectorRef) {
    this.subscription = router.events.subscribe((s: RouterEvent) => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    });
  }


  ngAfterContentInit(): void {
    this.links.changes.subscribe(_ => this.update());
    this.linksWithHrefs.changes.subscribe(_ => this.update());
    this.update();
  }

  @Input()
  set routerLinkActive(data: string[] | string) {
    const classes = Array.isArray(data) ? data : data.split(' ');
    this.classes = classes.filter(c => !!c);
  }

  ngOnChanges(changes: SimpleChanges): void { this.update(); }
  ngOnDestroy(): void { this.subscription.unsubscribe(); }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) return;
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.isActive !== hasActiveLinks) {
        (this as any).isActive = hasActiveLinks;
        this.classes.forEach((c) => {
          if (hasActiveLinks) {
            this.renderer.addClass(this.element.nativeElement, c);
          } else {
            this.renderer.removeClass(this.element.nativeElement, c);
          }
        });
      }
    });
  }

  private isLinkActive(router: Router): (link: (RouterLink | RouterLinkWithHref)) => boolean {
    return (link: RouterLink | RouterLinkWithHref) =>
      router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
  }

  private hasActiveLinks(): boolean {
    return this.links.some(this.isLinkActive(this.router)) ||
      this.linksWithHrefs.some(this.isLinkActive(this.router));
  }
}