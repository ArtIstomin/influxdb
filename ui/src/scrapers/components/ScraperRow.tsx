// Libraries
import React, {PureComponent} from 'react'

// Components
import {ResourceList, Context} from 'src/clockface'
import {ScraperTargetResponse} from '@influxdata/influx'

// Constants
import {DEFAULT_SCRAPER_NAME} from 'src/dashboards/constants'
import {IconFont, ComponentColor} from '@influxdata/clockface'

interface Props {
  scraper: ScraperTargetResponse
  onDeleteScraper: (scraper) => void
  onUpdateScraper: (scraper: ScraperTargetResponse) => void
}

export default class ScraperRow extends PureComponent<Props> {
  public render() {
    const {scraper} = this.props
    return (
      <>
        <ResourceList.Card
          name={() => (
            <ResourceList.EditableName
              onUpdate={this.handleUpdateScraperName}
              name={scraper.name}
              noNameString={DEFAULT_SCRAPER_NAME}
            />
          )}
          metaData={() => [
            <>Bucket: {scraper.bucket}</>,
            <>URL: {scraper.url}</>,
          ]}
          contextMenu={() => this.contextMenu}
        />
      </>
    )
  }

  private get contextMenu(): JSX.Element {
    const {onDeleteScraper} = this.props
    return (
      <Context>
        <Context.Menu icon={IconFont.Trash} color={ComponentColor.Danger}>
          <Context.Item label="Delete" action={onDeleteScraper} />
        </Context.Menu>
      </Context>
    )
  }

  private handleUpdateScraperName = async (name: string) => {
    const {onUpdateScraper, scraper} = this.props
    await onUpdateScraper({...scraper, name})
  }
}
